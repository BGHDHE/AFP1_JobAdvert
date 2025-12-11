// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // SQLite
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// --------------------
// REGISZTRÁCIÓ
// --------------------
app.post('/api/register', async (req, res) => {
  const { username, email, password, role = 'employer', location = '', phone = '', hasJob = false } = req.body;

  try {
    // Jelszó hash-elése
    const hash = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (username, email, password_hash, role, location, phone, hasJob) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [username, email, hash, role, location, phone, hasJob],
      function (err) {
        if (err) {
          console.error('Hiba regisztráció során:', err); // <--- logoljuk a hibát
          return res.status(400).json({ error: 'Már létezik ez az email!' });
        }
        console.log('Új felhasználó ID:', this.lastID); // <--- logoljuk a sikeres insertet
        res.status(201).json({ message: 'Sikeres regisztráció!', userId: this.lastID });
      }
    );
  } catch (err) {
    console.error('Hiba regisztráció során:', err);
    res.status(500).json({ error: 'Hiba történt' });
  }
});

// --------------------
// JOB SEARCH
// --------------------
app.get('/api/jobs/search', (req, res) => {
  const q = (req.query.q || '').toString().trim();
  const location = (req.query.location || '').toString().trim();

  let sql = `SELECT * FROM jobs`;
  const where = [];
  const params = [];

  if (q) {
    where.push(`LOWER(title) LIKE ?`);
    params.push(`%${q.toLowerCase()}%`);
  }

  if (location) {
    where.push(`LOWER(location) LIKE ?`);
    params.push(`%${location.toLowerCase()}%`);
  }

  if (where.length > 0) {
    sql += ` WHERE ` + where.join(' AND ');
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});

// --------------------
// LOGIN
// --------------------
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Felhasználó lekérdezése
    const user = await new Promise((resolve, reject) =>
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      })
    );

    if (!user) {
      return res.json({ success: false, message: 'Nincs ilyen felhasználó' });
    }

    // Jelszó ellenőrzés
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.json({ success: false, message: 'Hibás jelszó' });
    }

    // Ellenőrzés, hogy van-e céghez tartozó állás
    const job = await new Promise((resolve, reject) =>
      db.get('SELECT 1 FROM jobs WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      })
    );

    const isCompanyUser = !!job;

    res.json({
      success: true,
      user,
      isCompanyUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// --------------------
// SAJÁT ÁLLÁSOK LEKÉRDEZÉSE
// --------------------
app.get('/api/my-jobs/:employerId', (req, res) => {
  const employerId = req.params.employerId;

  if (!employerId || employerId === 'undefined') {
    return res.status(400).json({ success: false, message: 'Employer ID hiányzik' });
  }

  db.all(
    `SELECT * FROM jobs WHERE employer_id = ?`,
    [employerId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'DB hiba' });
      }
      res.json({
        success: true,
        jobs: rows || []
      });
    }
  );
});
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: 'Hiányzó token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Érvénytelen token' });
    req.user = user; // { id: 5, email: ... }
    next();
  });
};

app.get('/api/my-jobs', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM jobs WHERE employer_id = ? ORDER BY id DESC`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/jobs', authenticateToken, (req, res) => {
  const { title, description, company, location, salary } = req.body;

  if (!title || !company) {
    return res.status(400).json({ error: 'A cím és a cég neve kötelező' });
  }

  const sql = `INSERT INTO jobs (title, description, company, location, salary, employer_id)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [title, description || null, company, location || null, salary || null, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: 'Állás sikeresen létrehozva' });
  });
});

app.put('/api/jobs/:id', authenticateToken, (req, res) => {
  const { title, description, company, location, salary } = req.body;
  const jobId = req.params.id;

  const sql = `UPDATE jobs SET title = ?, description = ?, company = ?, location = ?, salary = ?
               WHERE id = ? AND employer_id = ?`;
  db.run(sql, [title, description || null, company, location || null, salary || null, jobId, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Nem található vagy nincs jogosultság' });
    res.json({ message: 'Állás sikeresen frissítve' });
  });
});

app.delete('/api/jobs/:id', authenticateToken, (req, res) => {
  const jobId = req.params.id;

  const sql = `DELETE FROM jobs WHERE id = ? AND employer_id = ?`;
  db.run(sql, [jobId, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Nem található vagy nincs jogosultság' });
    res.json({ message: 'Állás törölve' });
  });
});


// --------------------
// SERVER INDÍTÁS
// --------------------
app.listen(3000, () => {
  console.log('Backend fut: http://localhost:3000');
  console.log('Adatbázis: jobportal1.db (fájl a backend mappában)');
});
