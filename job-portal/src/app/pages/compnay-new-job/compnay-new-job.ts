import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-compnay-new-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compnay-new-job.html',
  styleUrl: './compnay-new-job.css',
})
export class CompnayNewJob implements OnInit {
  jobForm!: FormGroup;
  loading = false;
  error: string = '';
  success: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.initForm();
  }

  initForm(): void {
    this.jobForm = this.formBuilder.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required]
    });
  }

  submitJob(): void {
    if (!this.jobForm.valid) {
      this.error = 'Kérjük töltsd ki az összes mezőt!';
      return;
    }

    const user = this.authService.getUser();
    if (!user || !user.id) {
      this.error = 'Felhasználó nem bejelentkezve';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const jobData = {
      ...this.jobForm.value,
      employer_id: user.id
    };

    this.http.post('http://localhost:3000/api/jobs', jobData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.success = 'Hirdetés sikeresen közzétéve!';
        setTimeout(() => {
          this.router.navigate(['/company-main']);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Hiba a hirdetés közzétételénél: ' + (err.error?.error || 'Ismeretlen hiba');
        console.error('API hiba:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/company-main']);
  }
}
