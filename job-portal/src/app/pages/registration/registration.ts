import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class RegistrationComponent {

  register() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const hasJob = (document.getElementById('hasJob') as HTMLSelectElement).value === 'true';

    const userData = { name, email, password, location, phone, hasJob };
    console.log('Regisztrált felhasználó:', userData);
    alert('Sikeres regisztráció!');
  }
}
