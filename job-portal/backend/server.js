// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // SQLite
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key-change-in-production';
const TOKEN_EXPIRY = '24h';

const app = express();
app.use(cors());
app.use(express.json());

// --------------------
// AUTHENTICATION MIDDLEWARE
// --------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: 'Hiányzó token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token lejárt, kérlek jelentkezz be újra' });
      }
      return res.status(403).json({ error: 'Érvénytelen token' });
    }
    req.user = user; // { id: 5, email: ... }
    next();
  });
};

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
    const user = await new Promise((resolve, reject) =>
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      })
    );

    if (!user) {
      return res.json({ success: false, message: 'Nincs ilyen felhasználó' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.json({ success: false, message: 'Hibás jelszó' });
    }

    const job = await new Promise((resolve, reject) =>
      db.get('SELECT email, location FROM jobs WHERE employer_id = ?', [user.id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      })
    );

    const isCompanyUser = !!job;
    const companyEmail = job?.email || null;
    const companyLocation = job?.location || null;

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

    res.json({
      success: true,
      user,
      token,
      isCompanyUser,
      companyEmail,
      companyLocation
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
// --------------------
// FELHASZNÁLÓI PROFIL LEKÉRDEZÉSE
// --------------------
app.get('/api/profile', authenticateToken, (req, res) => {
  const sql = `SELECT id, username, email, role, location, phone, hasJob, created_at FROM users WHERE id = ?`;
  db.get(sql, [req.user.id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (!row) {
      return res.status(404).json({ success: false, error: 'Felhasználó nem található' });
    }
    res.json({ success: true, user: row });
  });
});

app.get('/api/my-jobs', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM jobs WHERE employer_id = ? ORDER BY id DESC`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/jobs', authenticateToken, (req, res) => {
  const { title, description, company, location, salary, email } = req.body;

  if (!title || !company) {
    return res.status(400).json({ error: 'A cím és a cég neve kötelező' });
  }

  const sql = `INSERT INTO jobs (title, description, company, location, salary, email, employer_id)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [title, description || null, company, location || null, salary || null, email || null, req.user.id], function(err) {
    if (err) {
      console.error('Job insert error:', err);
      return res.status(500).json({ error: err.message });
    }
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
// ÚJ MUNKAHIRDETÉS LÉTREHOZÁSA
// --------------------
app.post('/api/jobs', (req, res) => {
  const { title, description, company, location, email, salary, employer_id } = req.body;

  if (!title || !description || !company || !location || !email || !salary || !employer_id) {
    return res.status(400).json({ error: 'Hiányzó adatok' });
  }

  db.run(
    `INSERT INTO jobs (title, description, company, location, email, salary, employer_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description, company, location, email, salary, employer_id],
    function (err) {
      if (err) {
        console.error('Hiba a hirdetés létrehozásakor:', err);
        return res.status(500).json({ error: 'Hiba a hirdetés mentésekor' });
      }
      res.status(201).json({
        success: true,
        message: 'Hirdetés sikeresen létrehozva!',
        jobId: this.lastID
      });
    }
  );
});

// --------------------
// JELENTKEZÉS STÁTUSZÁNAK FRISSÍTÉSE
// --------------------
app.put('/api/application/:applicationId', authenticateToken, (req, res) => {
  const { status } = req.body;
  const applicationId = req.params.applicationId;

  if (!status || !['pending', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Érvénytelen státusz' });
  }

  const verifySql = `
    SELECT a.id
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.id = ? AND j.employer_id = ?
  `;

  db.get(verifySql, [applicationId, req.user.id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (!row) {
      return res.status(403).json({ success: false, error: 'Nincs jogosultság' });
    }

    const updateSql = `UPDATE applications SET status = ? WHERE id = ?`;
    db.run(updateSql, [status, applicationId], function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, message: 'Státusz frissítve' });
    });
  });
});

// --------------------
// JELENTKEZÉS ELKÜLDÉSE
// --------------------
app.post('/api/apply', authenticateToken, (req, res) => {
  const { job_id } = req.body;
  const applicant_id = req.user.id;

  if (!job_id) {
    return res.status(400).json({ success: false, error: 'Job ID hiányzik' });
  }

  db.run(
    `INSERT INTO applications (job_id, applicant_id, status)
     VALUES (?, ?, 'pending')`,
    [job_id, applicant_id],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ success: false, error: 'Már jelentkeztél erre az állásra' });
        }
        console.error('Hiba a jelentkezéskor:', err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, message: 'Sikeresen jelentkeztél az állásra!' });
    }
  );
});

// --------------------
// FELHASZNÁLÓ ALKALMAZÁSAINAK LEKÉRDEZÉSE
// --------------------
app.get('/api/my-applications', authenticateToken, (req, res) => {
  const sql = `
    SELECT
      a.id,
      a.status,
      a.applied_at,
      j.id as job_id,
      j.title,
      j.company,
      j.location,
      j.salary
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.applicant_id = ?
    ORDER BY a.applied_at DESC
  `;

  db.all(sql, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, applications: rows || [] });
  });
});

// --------------------
// ÁLLÁS HIRDETÉSRE JELENTKEZŐK LEKÉRDEZÉSE
// --------------------
app.get('/api/job/:jobId/applicants', authenticateToken, (req, res) => {
  const jobId = req.params.jobId;

  const sql = `
    SELECT
      a.id,
      a.status,
      a.applied_at,
      u.id as user_id,
      u.username,
      u.email,
      u.location,
      u.phone
    FROM applications a
    JOIN users u ON a.applicant_id = u.id
    WHERE a.job_id = ?
    ORDER BY a.applied_at DESC
  `;

  db.all(sql, [jobId], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, applicants: rows || [] });
  });
});

// --------------------
// ÖSSZES JELENTKEZÉS A FELHASZNÁLÓ HIRDETÉSEIRE
// --------------------
app.get('/api/my-job-applicants', authenticateToken, (req, res) => {
  const sql = `
    SELECT
      a.id,
      a.status,
      a.applied_at,
      j.id as job_id,
      j.title,
      j.company,
      u.id as user_id,
      u.username,
      u.email,
      u.location,
      u.phone
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    JOIN users u ON a.applicant_id = u.id
    WHERE j.employer_id = ?
    ORDER BY a.applied_at DESC
  `;

  db.all(sql, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, applicants: rows || [] });
  });
});

// --------------------
// JELENTKEZÉS ELLENŐRZÉSE
// --------------------
app.get('/api/check-application/:jobId', authenticateToken, (req, res) => {
  const jobId = req.params.jobId;
  const applicantId = req.user.id;

  const sql = `SELECT id FROM applications WHERE job_id = ? AND applicant_id = ?`;

  db.get(sql, [jobId, applicantId], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, hasApplied: !!row });
  });
});

// --------------------
// SERVER INDÍTÁS
// --------------------
app.listen(3000, () => {
  console.log('Backend fut: http://localhost:3000');
  console.log('Adatbázis: jobportal1.db (fájl a backend mappában)');
});
