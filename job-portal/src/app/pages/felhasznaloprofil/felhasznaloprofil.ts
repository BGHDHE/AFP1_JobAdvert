import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth';

interface JobApplication {
  title: string;
  dateApplied: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  location: string;
  phone: string;
  hasJob: boolean;
  role: string;
  applications: JobApplication[];
}

@Component({
  selector: 'app-felhasznaloprofil',
  templateUrl: './felhasznaloprofil.html',
  styleUrls: ['./felhasznaloprofil.css'],
  imports: [CommonModule, HttpClientModule]
})
export class FelhasznaloprofilComponent implements OnInit {

  user: User | null = null;
  applicationsHtml: string = '';
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const currentUser = this.authService.getUser();
    let token = currentUser?.token || localStorage.getItem('token');

    if (!currentUser || !token) {
      this.errorMessage = 'Nem vagy bejelentkezve!';
      this.loading = false;
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any>('http://localhost:3000/api/profile', { headers })
      .subscribe({
        next: (response) => {
          if (response.success && response.user) {
            this.user = {
              id: response.user.id,
              username: response.user.username,
              email: response.user.email,
              location: response.user.location || '',
              phone: response.user.phone || '',
              hasJob: response.user.hasJob || false,
              role: response.user.role || 'applicant',
              applications: []
            };
            this.generateApplicationsHtml();
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Hiba a profil betöltésénél:', err);
          this.errorMessage = 'Nem sikerült betölteni a profil adatokat.';
          this.loading = false;
        }
      });
  }

  generateApplicationsHtml(): void {
    if (this.user && this.user.applications && this.user.applications.length > 0) {
      this.applicationsHtml = this.user.applications
        .map(app => `<p>${app.title} - Jelentkezve: ${app.dateApplied}</p>`)
        .join('');
    } else {
      this.applicationsHtml = '<p>Még nem jelentkezett állásra.</p>';
    }
  }
}
