import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompnayNewJob } from './compnay-new-job';

describe('CompnayNewJob', () => {
  let component: CompnayNewJob;
  let fixture: ComponentFixture<CompnayNewJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompnayNewJob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompnayNewJob);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
