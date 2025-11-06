import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jelentkezesi-urlap',
  templateUrl: './jelentkezesi-urlap.component.html',
  styleUrls: ['./jelentkezesi-urlap.component.css']
})
export class JelentkezesiUrlapComponent implements OnInit {
  jelentkezesiForm!: FormGroup;
  isSubmitted = false;
  
  // Képzettségi szintek
  kepzettsegek = [
    { id: 1, nev: 'Középfokú' },
    { id: 2, nev: 'Felsőfokú' },
    { id: 3, nev: 'PhD' }
  ];
  
  // Munkatapasztalati évek
  tapasztalatEvek = [
    { id: 1, nev: '0-1 év' },
    { id: 2, nev: '1-3 év' },
    { id: 3, nev: '3-5 év' },
    { id: 4, nev: '5+ év' }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.jelentkezesiForm = this.formBuilder.group({
      // Személyes adatok
      nev: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefonszam: ['', [Validators.required, Validators.pattern(/^(\+?36|06)[0-9]{9}$/)]],
      
      // Szakmai adatok
      kepzettseg: ['', Validators.required],
      vegzettseg: ['', Validators.required],
      tapasztalatEv: ['', Validators.required],
      
      // Állás adatai
      allasId: ['', Validators.required],
      
      // További információk
      fizetesiIgeny: ['', [Validators.pattern(/^[0-9]+$/)]],
      oneletrajz: ['', Validators.required],
      motivaciosLevel: [''],
      egyebMegjegyzes: ['']
    });
  }

  get formControls() {
    return this.jelentkezesiForm.controls;
  }

  // Űrlap beküldése
  onSubmit(): void {
    this.isSubmitted = true;
    
    // Ha az űrlap érvénytelen, ne küldjük el
    if (this.jelentkezesiForm.invalid) {
      return;
    }
    
    // Itt küldjük el az adatokat a szervernek
    console.log('Jelentkezési adatok:', this.jelentkezesiForm.value);
    
    // TODO: API hívás implementálása
    
    // Űrlap visszaállítása
    this.jelentkezesiForm.reset();
    this.isSubmitted = false;
  }
}
