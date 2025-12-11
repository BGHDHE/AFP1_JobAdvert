import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
}

@Component({
  selector: 'app-company-main',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './company-main.html',
  styleUrls: ['./company-main.css']
})
export class CompanyMain implements OnInit {
  jobs: any[] = [];
  loading = false;
  error: string = '';

  showNewJobModal = false;

newJob = {
  title: '',
  company: '',
  location: '',
  email: '',
  salary: '',
  description: ''
};
  showForm = false;
  isEdit = false;
  currentJobId: number | null = null;

  title = '';
  company = '';
  location = '';
  salary = '';
  description = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/bejelentkezes']);
      return;
    }
    this.loadJobs();
  }

  private get token() {
    return localStorage.getItem('token') || '';
  }

loadJobs(): void {
    this.loading = true;
    this.http.get<Job[]>('http://localhost:3000/api/my-jobs', {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: (data) => {
        this.jobs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Hiba a betöltéskor. Lehet, hogy lejárt a bejelentkezésed.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  


  createNewJob(): void {
    this.showNewJobModal = true;
    this.isEdit = false;
    this.currentJobId = null;
    this.resetForm();
    this.showForm = true;
    this.router.navigate(['/company-new-job']);
  }

  saveNewJob(): void {
  //TBD
  console.log("Új állás mentve:", this.newJob);

  this.showNewJobModal = false;

  this.newJob = {
    title: '',
    company: '',
    location: '',
    email: '',
    salary: '',
    description: ''
  };

  this.loadJobs();
}

closeModal(): void {
  this.showNewJobModal = false;
}


  editJob(jobId: number): void {
    const job = this.jobs.find(j => j.id === jobId);
    if (!job) return;

    this.isEdit = true;
    this.currentJobId = jobId;
    this.title = job.title;
    this.company = job.company;
    this.location = job.location || '';
    this.salary = job.salary || '';
    this.description = job.description || '';
    this.showForm = true;
  }

  deleteJob(jobId: number): void {
    if (!confirm('Biztosan törlöd ezt az álláshirdetést?')) return;

    this.http.delete(`/api/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: () => {
        alert('Állás sikeresen törölve!');
        this.loadJobs();
      },
      error: () => alert('Hiba történt a törléskor')
    });
  }

  saveJob(): void {
    if (!this.title.trim() || !this.company.trim()) {
      alert('A cím és a cég neve kötelező!');
      return;
    }

    const jobData = {
      title: this.title,
      company: this.company,
      location: this.location,
      salary: this.salary,
      description: this.description
    };

    const headers = { Authorization: `Bearer ${this.token}` };

    if (this.isEdit && this.currentJobId) {
      this.http.put(`/api/jobs/${this.currentJobId}`, jobData, { headers }).subscribe({
        next: () => {
          alert('Állás sikeresen frissítve!');
          this.showForm = false;
          this.loadJobs();
        },
        error: () => alert('Hiba a frissítéskor')
      });
    } else {
      this.http.post('/api/jobs', jobData, { headers }).subscribe({
        next: () => {
          alert('Állás sikeresen létrehozva!');
          this.showForm = false;
          this.loadJobs();
        },
        error: () => alert('Hiba a létrehozáskor')
      });
    }
  }

  private resetForm(): void {
    this.title = '';
    this.company = '';
    this.location = '';
    this.salary = '';
    this.description = '';
  }

  cancelForm(): void {
    this.showForm = false;
  }
}
