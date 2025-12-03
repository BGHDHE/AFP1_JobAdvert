const db = require('./db');

db.serialize(() => {
  db.run("ALTER TABLE users ADD COLUMN location TEXT");
  db.run("ALTER TABLE users ADD COLUMN phone TEXT");
  db.run("ALTER TABLE users ADD COLUMN hasJob BOOLEAN", (err) => {
    if (err) console.error('Hiba a tábla módosításakor:', err);
    else console.log('Tábla sikeresen módosítva!');
    db.close();
  });
});
