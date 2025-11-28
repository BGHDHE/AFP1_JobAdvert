import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  loading = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  login() {
    this.loading = true;

    this.http.post('http://localhost:3000/api/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.success) {
          this.authService.setUser(res.user);

          if (res.isCompanyUser) {
            this.router.navigate(['/company-main']);
          } else {
            this.router.navigate(['']);
          }
        } else {
          alert('Wrong data');
        }
      },
      error: () => {
        this.loading = false;
        alert('Error');
      }
    });
  }
}
