import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  locationQuery: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

  }

onSearch(): void {
  if (this.searchQuery.trim() === '' && this.locationQuery.trim() === '') {
    return;
  }

  const params: any = {};
  if (this.searchQuery.trim()) {
    params.q = this.searchQuery.trim();
  }
  if (this.locationQuery.trim()) {
    params.location = this.locationQuery.trim();
  }

  this.http.get<any[]>(`http://localhost:3000/api/jobs/search`, { params }).subscribe({
    next: (results) => {
      this.router.navigate(['/searchjobs'], {
        state: {
          searchResults: results,
          searchQuery: this.searchQuery,
          locationQuery: this.locationQuery
        }
      });
    },
  });
}
}
