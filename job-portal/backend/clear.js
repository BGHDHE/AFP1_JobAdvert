const db = require('./db');

db.serialize(() => {
  db.run('DELETE FROM jobs', (err) => {
    if (err) console.error('Jobs törlési hiba:', err);
    else console.log('Jobs tábla kiürítve');
  });

  db.run('DELETE FROM users', (err) => {
    if (err) console.error('Users törlési hiba:', err);
    else console.log('Users tábla kiürítve');
  });

  setTimeout(() => process.exit(0), 500);
});