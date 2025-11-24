import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMain } from './company-main';

describe('CompanyMain', () => {
  let component: CompanyMain;
  let fixture: ComponentFixture<CompanyMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
