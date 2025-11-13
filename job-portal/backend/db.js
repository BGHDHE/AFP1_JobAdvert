const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'jobportal1.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('DB csatlakozási hiba:', err);
  } else {
    console.log('SQLite adatbázis kész: jobportal1.db');
  }
});

db.serialize(() => {
  // 1. USERS tábla
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `, (err) => {
    if (err) console.error('users tábla hiba:', err);
    else console.log('users tábla kész vagy létezik');
  });

  // 2. JOBS tábla
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      company TEXT,
      location TEXT,
      salary TEXT,
      employer_id INTEGER,
      FOREIGN KEY (employer_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('jobs tábla hiba:', err);
    else console.log('jobs tábla kész vagy létezik');
  });
});

// Exportáld a db-t
module.exports = db;