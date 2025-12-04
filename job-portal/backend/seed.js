const db = require('./db');
const bcrypt = require('bcrypt');

async function insertUser(username, email, password, role = 'employer') {
  const password_hash = await bcrypt.hash(password, 10);

  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES (?, ?, ?, ?)`,
      [username, email, password_hash, role],
      function (err) {
        if (err) return rej(err);
        res(this.lastID);
      }
    );
  });
}

function getUserByEmail(email) {
  return new Promise((res, rej) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) rej(err);
      else res(row);
    });
  });
}

async function getOrCreateUser(email) {
  const existing = await getUserByEmail(email);
  if (existing) return existing.id;

  const username = email.split('@')[0];
  const defaultPassword = 'asd';

  const newId = await insertUser(username, email, defaultPassword, 'employer');
  return newId;
}

function insertJob(title, description, company, location, email, salary, employer_id) {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO jobs
        (title, description, company, location, email, salary, employer_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, company, location, email, salary, employer_id],
      function (err) {
        if (err) return rej(err);
        res(this.lastID);
      }
    );
  });
}

async function insertJobWithAdmin({ title, description, company, location, email, salary }) {
  const employerId = await getOrCreateUser(email);
  return insertJob(title, description, company, location, email, salary, employerId);
}

async function seed() {
  try {
    const row = await new Promise((res, rej) =>
      db.get(`SELECT COUNT(*) AS cnt FROM jobs`, (err, r) => (err ? rej(err) : res(r)))
    );

    if (row && row.cnt > 0) {
      console.log('Seed kihagyva: a jobs tábla nem üres.');
      process.exit(0);
    }


    await insertJobWithAdmin({
      title: 'Frontend Developer (Angular)',
      description: 'We are looking for an experienced Angular developer. HTML/CSS and TypeScript are required.',
      company: 'WebSolutions Ltd.',
      location: 'Budapest',
      email: 'websolutionsltd@example.com',
      salary: '400000 HUF'
    });

    await insertJobWithAdmin({
      title: 'Backend Developer (Node.js)',
      description: 'Experience with Node.js, Express, and SQLite/SQL is a plus.',
      company: 'TechFactory Corp.',
      location: 'Debrecen',
      email: 'techfactorycorp@example.com',
      salary: '650000 HUF'
    });

    await insertJobWithAdmin({
      title: 'Junior SAP Tester',
      description: 'Testing experience and basic automation knowledge are required.',
      company: 'QualityLab',
      location: 'Szeged',
      email: 'qualitylab@example.com',
      salary: '620000 HUF'
    });

    await insertJobWithAdmin({
      title: 'Full Stack Developer (React + Node.js)',
      description: 'We are seeking a full-stack engineer with strong React and Node.js knowledge.',
      company: 'Innovatech Solutions',
      location: 'Budapest',
      email: 'innovatechsolutions@example.com',
      salary: '700000 HUF'
    });

    await insertJobWithAdmin({
      title: 'DevOps Engineer',
      description: 'Docker, Kubernetes, CI/CD pipelines and cloud platforms (AWS/Azure) experience are required.',
      company: 'SysOps Group',
      location: 'Győr',
      email: 'sysopsgroup@example.com',
      salary: '800000 HUF'
    });

    await insertJobWithAdmin({
      title: 'IT Project Manager',
      description: 'Experience in agile methodologies (Scrum/Kanban) and strong communication skills are required.',
      company: 'PM Experts Ltd.',
      location: 'Budapest',
      email: 'pmexpertsltd@example.com',
      salary: '750000 HUF'
    });

    await insertJobWithAdmin({
      title: 'Data Analyst',
      description: 'Strong SQL skills, data visualization (Power BI/Tableau), and basic Python knowledge are required.',
      company: 'DataWave Analytics',
      location: 'Pécs',
      email: 'datawaveanalytics@example.com',
      salary: '600000 HUF'
    });

    await insertJobWithAdmin({
      title: 'Mobile Developer (Flutter)',
      description: 'Flutter and Dart experience are required.',
      company: 'AppMasters',
      location: 'Miskolc',
      email: 'appmasters@example.com',
      salary: '680000 HUF'
    });

    await insertJobWithAdmin({
      title: 'Cybersecurity Specialist',
      description: 'Network security, vulnerability scanning tools, and incident response experience are required.',
      company: 'SecureNet Kft.',
      location: 'Budapest',
      email: 'securenetkft@example.com',
      salary: '900000 HUF'
    });

    await insertJobWithAdmin({
      title: 'QA Automation Engineer',
      description: 'Automation frameworks (Selenium, Cypress) and API testing experience are required.',
      company: 'TestPro Labs',
      location: 'Szeged',
      email: 'testprolabs@example.com',
      salary: '630000 HUF'
    });

    await insertJobWithAdmin({
      title: 'System Administrator (Linux)',
      description: 'Strong Linux administration skills, shell scripting, and server maintenance experience are required.',
      company: 'ServerCore',
      location: 'Debrecen',
      email: 'servercore@example.com',
      salary: '550000 HUF'
    });

    console.log('Seed kész.');
    process.exit(0);
  } catch (err) {
    console.error('Seed hiba:', err);
    process.exit(1);
  }
}

seed();
