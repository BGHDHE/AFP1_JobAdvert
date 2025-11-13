import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchJobsComponent } from './searchjobs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchJobsComponent', () => {
  let component: SearchJobsComponent;
  let fixture: ComponentFixture<SearchJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchJobsComponent],
      schemas: [NO_ERRORS_SCHEMA] // hogy az [innerHTML] ne dobjon hibát
    }).compileComponents();

    fixture = TestBed.createComponent(SearchJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have jobs defined', () => {
    expect(component.jobs.length).toBeGreaterThan(0);
  });

  it('should generate jobsHtml', () => {
    expect(component.jobsHtml).toContain(component.jobs[0].title);
    expect(component.jobsHtml).toContain(component.jobs[1].title);
  });

  it('should mark a job as applied', () => {
    const job = component.jobs[0];
    expect(job.applied).toBeFalse();

    component.apply(0); // apply metódus hívása index alapján
    expect(job.applied).toBeTrue();

    // Ellenőrizhetjük, hogy a jobsHtml frissült
    expect(component.jobsHtml).toContain('Jelentkezve');
  });
});
