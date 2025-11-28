const db = require('./db');

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS jobs', (err) => {
    if (err) console.error('Jobs tábla törlési hiba:', err);
    else console.log('Jobs tábla törölve');
  });

  db.run('DROP TABLE IF EXISTS users', (err) => {
    if (err) console.error('Users tábla törlési hiba:', err);
    else console.log('Users tábla törölve');
  });

  setTimeout(() => process.exit(0), 500);
});
