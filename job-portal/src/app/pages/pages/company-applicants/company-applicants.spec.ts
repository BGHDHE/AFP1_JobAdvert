import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApplicants } from './company-applicants';

describe('CompanyApplicants', () => {
  let component: CompanyApplicants;
  let fixture: ComponentFixture<CompanyApplicants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyApplicants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyApplicants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
