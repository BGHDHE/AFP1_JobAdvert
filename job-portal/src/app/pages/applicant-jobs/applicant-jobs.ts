import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-applicant-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './applicant-jobs.html',
  styleUrls: ['./applicant-jobs.css'],
})
export class ApplicantJobs implements OnInit {
  jobs: any[] = [];
  loading = false;
  error = '';

  withdrawApplication(jobId: number) {
  console.log('Lejelentkezés az állásról, ID:', jobId);}

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadJobs();
  }

  loadJobs(): void {
    const user = this.authService.getUser();
    if (!user || !user.id) {
      this.error = 'Nem vagy bejelentkezve';
      return;
    }

    this.loading = true;
    this.http.get<any>(`http://localhost:3000/api/applicant-jobs/${user.id}`)
      .subscribe({
        next: (res) => {
          this.jobs = res.jobs || [];
          this.loading = false;
        },
        error: (err) => {
          console.error('Hiba az állások lekérésekor:', err);
          this.error = 'Hiba történt az állások lekérésekor.';
          this.loading = false;
        }
      });
  }
}
