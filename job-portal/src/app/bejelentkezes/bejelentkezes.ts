import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bejelentkezes.html',
  styleUrls: ['./bejelentkezes.css']
})
export class BejelentkezesComponent {
  email = '';
  password = '';
  message = '';
  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.message = 'Töltsd ki mindkét mezőt!';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.http.post('/api/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.message = 'Sikeres bejelentkezés!';
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        this.message = err.error?.error || 'Hiba történt';
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }
}