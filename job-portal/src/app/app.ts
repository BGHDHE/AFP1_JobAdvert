import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,  // standalone komponens
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    Header
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('job-portal');
}
