import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

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

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadJobs();
  }

  loadJobs(): void {
    const user = this.authService.getUser();

    if (!user || !user.id) {
      this.error = 'Felhasználó nem bejelentkezve';
      return;
    }

    this.loading = true;
    this.http.get<any>(`http://localhost:3000/api/my-jobs/${user.id}`).subscribe({
      next: (res) => {
        this.jobs = res.jobs || [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Hiba történt a hirdetések lekérésekor.';
        console.error('API hiba:', err);
      }
    });
  }

  


  createNewJob(): void {
    this.showNewJobModal = true;
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
    alert('coming soon');

  }

  deleteJob(jobId: number): void {
    alert('coming soon')
    }
}
