import { Component, OnInit } from '@angular/core';
import { RegistrationService, RegisterUser } from '../../services/registration';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private registrationService: RegistrationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  register() {
    const username = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const hasJob = (document.getElementById('hasJob') as HTMLSelectElement).value === 'true';

    const userData: RegisterUser = {
      username,
      email,
      password,
      role: 'employee',
      location,
      phone,
      hasJob
    };

    this.registrationService.register(userData).subscribe({
      next: (res: any) => {
        console.log('Backend válasz:', res);
        alert('Sikeres regisztráció!');
        this.authService.setUser(userData); // opcionális: azonnal tároljuk a kliens oldalon
      },
      error: (err: any) => {
        console.error('Hiba a regisztráció során:', err);
        alert('Hiba a regisztráció során!');
      }
    });
  }
}
