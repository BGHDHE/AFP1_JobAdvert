const db = require('./db');

function insertUser(username, email, password_hash) {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)`,
      [username, email, password_hash, 'employer'],
      function (err) {
        if (err) return rej(err);
        res(this.lastID);
      }
    );
  });
}

function insertJob(title, description, company, location, salary, employer_id) {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO jobs (title, description, company, location, salary, employer_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, company, location, salary, employer_id],
      function (err) {
        if (err) return rej(err);
        res(this.lastID);
      }
    );
  });
}

async function seed() {
  try {
    const row = await new Promise((res, rej) =>
      db.get(`SELECT COUNT(*) AS cnt FROM jobs`, (err, r) => (err ? rej(err) : res(r)))
    );
    if (row && row.cnt > 0) {
      process.exit(0);
    }

    const emp1 = await insertUser('admin', 'admin@example.com', 'password123');

await insertJob(
  'Frontend Developer (Angular)',
  'We are looking for an experienced Angular developer. HTML/CSS and TypeScript are required.',
  'WebSolutions Ltd.',
  'Budapest',
  '400000 HUF',
  emp1
);

await insertJob(
  'Backend Developer (Node.js)',
  'Experience with Node.js, Express, and SQLite/SQL is a plus.',
  'TechFactory Corp.',
  'Debrecen',
  '650000 HUF',
  emp1
);

await insertJob(
  'Junior SAP Tester',
  'Testing experience and basic automation knowledge are required.',
  'QualityLab',
  'Szeged',
  '620000 HUF',
  emp1
);
    process.exit(0);
  } 
  catch (err) {
    process.exit(1);
  }
}
seed();