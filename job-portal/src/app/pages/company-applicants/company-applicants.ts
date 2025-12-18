import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-company-applicants',
  imports: [CommonModule, RouterModule],
  templateUrl: './company-applicants.html',
  styleUrl: './company-applicants.css',
})
export class CompanyApplicants implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
