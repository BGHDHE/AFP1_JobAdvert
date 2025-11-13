import { Component, OnInit } from '@angular/core';

interface Company {
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface Job {
  title: string;
  description: string;
  company: Company;
  datePosted: string;
  applied: boolean;
}

@Component({
  selector: 'app-searchjobs',
  templateUrl: './searchjobs.html',
  styleUrls: ['./searchjobs.css']
})
export class SearchJobsComponent implements OnInit {

  jobs: Job[] = [];
  jobsHtml: string = ''; // ide generáljuk a HTML-t

  constructor() { }

  ngOnInit(): void {
    // Példaadatok, később majd adatbázisból töltjük
    this.jobs = [
      {
        title: 'Frontend fejlesztő',
        description: 'Angular és TypeScript ismerete szükséges.',
        company: {
          name: 'TechSolutions Kft.',
          address: 'Budapest, Fő utca 12.',
          email: 'hr@techsolutions.hu',
          phone: '+36 30 123 4567'
        },
        datePosted: '2025-11-01',
        applied: false
      },
      {
        title: 'Backend fejlesztő',
        description: 'Node.js és Express tapasztalat előny.',
        company: {
          name: 'Innovatech Zrt.',
          address: 'Debrecen, Kossuth tér 5.',
          email: 'jobs@innovatech.hu',
          phone: '+36 52 987 6543'
        },
        datePosted: '2025-11-05',
        applied: false
      }
    ];

    // Generáljuk a HTML-t
    this.generateJobsHtml();
  }

  apply(index: number): void {
    this.jobs[index].applied = true;
    this.generateJobsHtml(); // frissítjük a HTML-t
    alert(`Sikeresen jelentkeztél a következő pozícióra: ${this.jobs[index].title}`);
  }

  private generateJobsHtml(): void {
    if (this.jobs.length === 0) {
      this.jobsHtml = '<p>Jelenleg nincs elérhető állás.</p>';
      return;
    }

    this.jobsHtml = this.jobs.map((job, i) => `
      <div class="job-card">
        <h3>${job.title}</h3>
        <p><strong>Leírás:</strong> ${job.description}</p>
        <p><strong>Dátum:</strong> ${job.datePosted}</p>

        <div class="company-info">
          <p><strong>Cég:</strong> ${job.company.name}</p>
          <p><strong>Cím:</strong> ${job.company.address}</p>
          <p><strong>Email:</strong> ${job.company.email}</p>
          <p><strong>Telefon:</strong> ${job.company.phone}</p>
        </div>

        <button onclick="window['applyJob'](${i})" ${job.applied ? 'disabled' : ''}>
          ${job.applied ? 'Jelentkezve' : 'Jelentkezés'}
        </button>
      </div>
    `).join('');

    // Globális függvény az onclick működéséhez
    (window as any)['applyJob'] = (index: number) => this.apply(index);
  }
}
