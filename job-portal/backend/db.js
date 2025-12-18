const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./jobportal1.db', (err) => {
  if (err) {
    console.error('Nem lehet megnyitni az adatbázist:', err);
  } else {
    console.log('SQLite adatbázis csatlakoztatva.');
  }
});

db.run('PRAGMA foreign_keys = ON');

// TÁBLÁK LÉTREHOZÁSA
db.serialize(() => {
  // USERS TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'employer',
      location TEXT NOT NULL,
      phone TEXT,
      hasJob BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // JOBS TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      email TEXT NOT NULL,
      salary TEXT,
      employer_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (employer_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // APPLICATIONS TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER NOT NULL,
      applicant_id INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE,
      FOREIGN KEY (applicant_id) REFERENCES users (id) ON DELETE CASCADE,
      UNIQUE(job_id, applicant_id)
    )
  `);
});

module.exports = db;
