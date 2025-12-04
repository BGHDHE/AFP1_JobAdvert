import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-jobs',
  imports: [],
  templateUrl: './applicant-jobs.html',
  styleUrl: './applicant-jobs.css',
})
export class ApplicantJobs implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
