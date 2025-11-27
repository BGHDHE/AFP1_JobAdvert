import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchjobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchjobs.html',
  styleUrls: ['./searchjobs.css']
})
export class SearchjobsComponent implements OnInit {
  searchResults: any[] = [];
  searchQuery: string = '';
  locationQuery: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const state = this.router.getCurrentNavigation()?.extras.state || window.history.state;

    if (state && state.searchResults) {
      this.searchResults = state.searchResults;
      this.searchQuery = state.searchQuery || '';
      this.locationQuery = state.locationQuery || '';
      console.log('Search results:', this.searchResults);
    }
  }

  onApply(job: any): void {
    alert(`Jelentkezés elküldve: ${job.title}`);
  }
}
