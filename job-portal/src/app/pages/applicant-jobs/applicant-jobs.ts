import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-applicant-jobs',
  imports: [CommonModule, RouterModule],
  templateUrl: './applicant-jobs.html',
  styleUrl: './applicant-jobs.css',
})
export class ApplicantJobs implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
