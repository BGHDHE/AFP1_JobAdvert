import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';

interface Application {
  id: number;
  job_id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: string;
  applied_at: string;
}

@Component({
  selector: 'app-applicant-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applicant-jobs.html',
  styleUrl: './applicant-jobs.css',
})
export class ApplicantJobs implements OnInit {
  applications: Application[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadApplications();
  }

  loadApplications(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Nem vagy bejelentkezve!';
      this.loading = false;
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.http.get<any>('http://localhost:3000/api/my-applications', { headers })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.applications = response.applications;
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Hiba az alkalmazások betöltésénél:', err);
          this.errorMessage = 'Nem sikerült betölteni az alkalmazásaidat.';
          this.loading = false;
        }
      });
  }

  getStatusLabel(status: string): string {
    const statuses: { [key: string]: string } = {
      'pending': 'Függőben',
      'accepted': 'Elfogadva',
      'rejected': 'Elutasítva'
    };
    return statuses[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'pending': 'status-pending',
      'accepted': 'status-accepted',
      'rejected': 'status-rejected'
    };
    return classes[status] || '';
  }

  withdrawApplication(app: Application): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Nincs bejelentkezve!');
      return;
    }

    if (!confirm('Biztosan vissza szeretnéd vonni a jelentkezésed?')) {
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.http.put(`http://localhost:3000/api/application/${app.id}`, { status: 'withdrawn' }, { headers })
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            alert('Jelentkezés visszavonva!');
            this.applications = this.applications.filter(a => a.id !== app.id);
          }
        },
        error: (err) => {
          console.error('Hiba a visszavonásnál:', err);
          alert('Hiba történt a jelentkezés visszavonásánál');
        }
      });
  }
}
