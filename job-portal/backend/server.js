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

app.get('/api/jobs/search', (req, res) => {
  const q = (req.query.q || '').toString().trim();

  const term = `%${q.toLowerCase()}%`;
  db.all(
    `SELECT * FROM jobs WHERE 
       LOWER(title) LIKE ? OR 
       LOWER(company) LIKE ? OR 
       LOWER(location) LIKE ? OR 
       LOWER(COALESCE(description, '')) LIKE ?`,
    [term, term, term, term],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log('Backend fut: http://localhost:3000');
  console.log('Adatbázis: jobportal1.db (fájl a backend mappában)');
});