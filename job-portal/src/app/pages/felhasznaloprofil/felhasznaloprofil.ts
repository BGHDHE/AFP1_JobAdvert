import { Component, OnInit } from '@angular/core';

interface JobApplication {
  title: string;
  dateApplied: string;
}

interface User {
  name: string;
  email: string;
  location: string;
  phone: string;
  hasJob: boolean;
  applications: JobApplication[];
}

@Component({
  selector: 'app-felhasznaloprofil',
  templateUrl: './felhasznaloprofil.html',
  styleUrls: ['./felhasznaloprofil.css']
})
export class FelhasznaloprofilComponent implements OnInit {

  user: User;

  applicationsHtml: string = ''; // ide kerül a HTML lista

  constructor() {
    this.user = {
      name: 'Kiss Péter',
      email: 'kiss.peter@example.com',
      location: 'Budapest',
      phone: '+36 30 123 4567',
      hasJob: true,
      applications: [
        { title: 'Frontend fejlesztő', dateApplied: '2025-10-01' },
        { title: 'Backend fejlesztő', dateApplied: '2025-10-15' }
      ]
    };
  }

  ngOnInit(): void {
    // Generáljuk a jelentkezések HTML-t
    window.scrollTo(0, 0);
    if (this.user.applications.length > 0) {
      this.applicationsHtml = this.user.applications
        .map(app => `<p>${app.title} - Jelentkezve: ${app.dateApplied}</p>`)
        .join('');
    } else {
      this.applicationsHtml = '<p>Még nem jelentkezett állásra.</p>';
    }
  }
}
