import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-searchjobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchjobs.html',
  styleUrls: ['./searchjobs.css']
})
export class SearchjobsComponent implements OnInit {
  searchResults: any[] = [];
  searchQuery: string = '';
  locationQuery: string = '';
  appliedJobs: Set<number> = new Set();
  isLoggedIn = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const state = this.router.getCurrentNavigation()?.extras.state || window.history.state;

    if (state && state.searchResults) {
      this.searchResults = state.searchResults;
      this.searchQuery = state.searchQuery || '';
      this.locationQuery = state.locationQuery || '';
      console.log('Search results:', this.searchResults);
    }

    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.checkAppliedJobs();
    }
  }

  checkAppliedJobs(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };
    this.http.get<any>('http://localhost:3000/api/my-applications', { headers })
      .subscribe({
        next: (response) => {
          if (response.success && response.applications) {
            response.applications.forEach((app: any) => {
              this.appliedJobs.add(app.job_id);
            });
          }
        },
        error: (err) => {
          console.error('Hiba az alkalmazások betöltésénél:', err);
        }
      });
  }

  hasApplied(jobId: number): boolean {
    return this.appliedJobs.has(jobId);
  }

  onApply(job: any): void {
    if (!this.isLoggedIn) {
      alert('Kérlek jelentkezz be, hogy jelentkezhess az állásokra!');
      this.router.navigate(['/login']);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Hiba az autentikációban. Kérlek jelentkezz be újra!');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.http.post('http://localhost:3000/api/apply', { job_id: job.id }, { headers })
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            alert('Sikeresen jelentkeztél az állásra!');
            this.appliedJobs.add(job.id);
          } else {
            alert(response.error || 'Hiba történt a jelentkezés során');
          }
        },
        error: (err) => {
          if (err.error?.error?.includes('UNIQUE')) {
            alert('Már jelentkeztél erre az állásra!');
            this.appliedJobs.add(job.id);
          } else {
            alert(err.error?.error || 'Hiba történt a jelentkezés során');
          }
        }
      });
  }
}
