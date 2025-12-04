const express = require('express');
const router = express.Router();
const db = require('../db'); // ha a routes mappa a backend mappában van

// Regisztrációs endpoint
router.post('/register', (req, res) => {
  const { name, email, password, location, phone, hasJob } = req.body;

  db.run(
    `INSERT INTO users (username, email, password_hash, location, phone, hasJob)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, password, location, phone, hasJob],
    function (err) {
      if (err) {
        console.error('Hiba az adatok mentésekor:', err);
        return res.status(500).json({ error: 'Nem sikerült létrehozni a felhasználót' });
      }
      res.status(201).json({ message: 'Felhasználó regisztrálva', id: this.lastID });
    }
  );
});

module.exports = router;
