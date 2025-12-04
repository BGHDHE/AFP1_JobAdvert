import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-applicants',
  imports: [],
  templateUrl: './company-applicants.html',
  styleUrl: './company-applicants.css',
})
export class CompanyApplicants implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
