// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // SQLite

const app = express();
app.use(cors());
app.use(express.json());

// Regisztráció
app.post('/api/register', (req, res) => {
  const { username, email, password, role } = req.body;
  const bcrypt = require('bcrypt');

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Hiba' });

    db.run(
      `INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)`,
      [username, email, hash, role],
      function(err) {
        if (err) {
          return res.status(400).json({ error: 'Már létezik!' });
        }
        res.json({ message: 'Sikeres regisztráció!', userId: this.lastID });
      }
    );
  });
});

// JobSearch
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

//Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await new Promise((resolve, reject) =>
      db.get('SELECT * FROM users WHERE email = ? AND password_hash = ?', [email, password], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      })
    );

    if (!user) {
      return res.json({ success: false });
    }

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




app.listen(3000, () => {
  console.log('Backend fut: http://localhost:3000');
  console.log('Adatbázis: jobportal1.db (fájl a backend mappában)');
});
