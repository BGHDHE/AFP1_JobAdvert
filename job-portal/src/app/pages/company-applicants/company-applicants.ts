import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';

interface Applicant {
  id: number;
  job_id: number;
  title: string;
  company: string;
  user_id: number;
  username: string;
  email: string;
  location: string;
  phone: string;
  status: string;
  applied_at: string;
}

@Component({
  selector: 'app-company-applicants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-applicants.html',
  styleUrl: './company-applicants.css',
})
export class CompanyApplicants implements OnInit {
  applicants: Applicant[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadApplicants();
  }

  loadApplicants(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Nem vagy bejelentkezve!';
      this.loading = false;
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.http.get<any>('http://localhost:3000/api/my-job-applicants', { headers })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.applicants = response.applicants;
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Hiba az alkalmazottak betöltésénél:', err);
          this.errorMessage = 'Nem sikerült betölteni az alkalmazottakat.';
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

  acceptApplication(applicant: Applicant): void {
    this.updateApplicationStatus(applicant.id, 'accepted', applicant);
  }

  rejectApplication(applicant: Applicant): void {
    this.updateApplicationStatus(applicant.id, 'rejected', applicant);
  }

  private updateApplicationStatus(applicationId: number, status: string, applicant: Applicant): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Nincs bejelentkezve!');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.http.put(`http://localhost:3000/api/application/${applicationId}`, { status }, { headers })
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const statusText = status === 'accepted' ? 'Elfogadva' : 'Elutasítva';
            alert(`Jelentkezés ${statusText}!`);
            applicant.status = status;
          }
        },
        error: (err) => {
          console.error('Hiba a státusz frissítésénél:', err);
          alert('Hiba történt a státusz frissítésénél');
        }
      });
  }
}
