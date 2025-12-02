import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantJobs } from './applicant-jobs';

describe('ApplicantJobs', () => {
  let component: ApplicantJobs;
  let fixture: ComponentFixture<ApplicantJobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantJobs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantJobs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
