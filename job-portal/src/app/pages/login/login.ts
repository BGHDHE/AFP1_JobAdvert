import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.css'],
})
export class Login {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.loading = true;

    this.http.post('http://localhost:3000/api/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.success) {
          localStorage.setItem('user', JSON.stringify(res.user));

          this.router.navigate(['/company-main']);
        } 
        else {
          alert('Helytelen email vagy jelszó!');
        }
      },
      error: () => {
        this.loading = false;
        alert('Hiba történt a bejelentkezéskor.');
      }
    });
  }
}
