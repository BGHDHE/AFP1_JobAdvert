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

await insertJob(
  'Full Stack Developer (React + Node.js)',
  'We are seeking a full-stack engineer with strong React and Node.js knowledge. Experience with REST APIs is required.',
  'Innovatech Solutions',
  'Budapest',
  '700000 HUF',
  emp1
);

await insertJob(
  'DevOps Engineer',
  'Docker, Kubernetes, CI/CD pipelines and cloud platforms (AWS/Azure) experience is required.',
  'SysOps Group',
  'Győr',
  '800000 HUF',
  emp1
);

await insertJob(
  'IT Project Manager',
  'Experience in agile methodologies (Scrum/Kanban) and strong communication skills are required.',
  'PM Experts Ltd.',
  'Budapest',
  '750000 HUF',
  emp1
);

await insertJob(
  'Data Analyst',
  'Strong SQL skills, data visualization (Power BI/Tableau), and basic Python knowledge are required.',
  'DataWave Analytics',
  'Pécs',
  '600000 HUF',
  emp1
);

await insertJob(
  'Mobile Developer (Flutter)',
  'Flutter and Dart experience are required. iOS/Android native knowledge is a plus.',
  'AppMasters',
  'Miskolc',
  '680000 HUF',
  emp1
);

await insertJob(
  'Cybersecurity Specialist',
  'Network security, vulnerability scanning tools, and incident response experience are required.',
  'SecureNet Kft.',
  'Budapest',
  '900000 HUF',
  emp1
);

await insertJob(
  'QA Automation Engineer',
  'Automation frameworks (Selenium, Cypress) and API testing experience are required.',
  'TestPro Labs',
  'Szeged',
  '630000 HUF',
  emp1
);

await insertJob(
  'System Administrator (Linux)',
  'Strong Linux administration skills, shell scripting, and server maintenance experience are required.',
  'ServerCore',
  'Debrecen',
  '550000 HUF',
  emp1
);

    process.exit(0);
  }
  catch (err) {
    process.exit(1);
  }
}
seed();
