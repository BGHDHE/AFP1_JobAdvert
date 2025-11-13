import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FelhasznaloprofilComponent } from './felhasznaloprofil';
import { By } from '@angular/platform-browser';

describe('FelhasznaloprofilComponent', () => {
  let component: FelhasznaloprofilComponent;
  let fixture: ComponentFixture<FelhasznaloprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FelhasznaloprofilComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FelhasznaloprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a user defined', () => {
    expect(component.user).not.toBeNull();
  });

  it('should display the user name in the template', () => {
    // Biztonságosan lekérdezzük a user-info div-et
    const userInfoDiv = fixture.debugElement.query(By.css('.user-info'));
    expect(userInfoDiv).toBeTruthy();

    // Ellenőrizzük, hogy a név benne van a HTML-ben
    const nameText = userInfoDiv.nativeElement.textContent;
    expect(nameText).toContain(component.user?.name || '');
  });

  it('should display the user email in the template', () => {
    const userInfoDiv = fixture.debugElement.query(By.css('.user-info'));
    const emailText = userInfoDiv.nativeElement.textContent;
    expect(emailText).toContain(component.user?.email || '');
  });

  it('should display the user phone in the template', () => {
    const userInfoDiv = fixture.debugElement.query(By.css('.user-info'));
    const phoneText = userInfoDiv.nativeElement.textContent;
    expect(phoneText).toContain(component.user?.phone || '');
  });
});
