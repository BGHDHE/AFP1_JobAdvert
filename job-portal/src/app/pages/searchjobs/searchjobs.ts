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
  jobsHtml: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state || window.history.state;

    if (state && state.searchResults) {
      this.searchResults = state.searchResults;
      this.searchQuery = state.searchQuery || '';
      console.log('Search results:', this.searchResults);
      this.generateJobsHtml();
    } 
    else {
      this.jobsHtml = '<p>No results.</p>';
    }
  }

  generateJobsHtml(): void {
    if (this.searchResults.length === 0) {
      this.jobsHtml = '<p>Nincs találat a kereséshez.</p>';
      return;
    }

    let html = `<h3>Search results: "${this.searchQuery}" (${this.searchResults.length})</h3>`;
    html += '<div class="jobs-list">';

    this.searchResults.forEach((job) => {
      html += `
        <div class="job-card">
          <h4>${job.title}</h4>
          <p><strong>Cég:</strong> ${job.company}</p>
          <p><strong>Helyszín:</strong> ${job.location}</p>
          <p><strong>Bér:</strong> ${job.salary || 'Nem adott meg'}</p>
          <p>${job.description}</p>
        </div>
      `;
    });

    html += '</div>';
    this.jobsHtml = html;
  }
}