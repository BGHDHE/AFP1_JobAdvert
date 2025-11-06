import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jelentkezes, Allas } from './jelentkezes.model';

@Injectable({
  providedIn: 'root'
})
export class JelentkezesService {
  // Ezt a URL-t a valódi API végpontra kell módosítani
  private apiUrl = 'api/jelentkezesek';
  private allasApiUrl = 'api/allasok';
  
  constructor(private http: HttpClient) { }
  
  // Új jelentkezés létrehozása
  createJelentkezes(jelentkezes: Jelentkezes): Observable<Jelentkezes> {
    // FormData használata a fájl feltöltés miatt
    const formData = new FormData();
    
    // Jelentkezés adatainak hozzáadása a FormData-hoz
    Object.keys(jelentkezes).forEach(key => {
      if (key !== 'oneletrajz') {
        formData.append(key, String(jelentkezes[key as keyof Jelentkezes]));
      }
    });
    
    // Önéletrajz fájl hozzáadása, ha létezik
    if (jelentkezes.oneletrajz instanceof File) {
      formData.append('oneletrajz', jelentkezes.oneletrajz, jelentkezes.oneletrajz.name);
    }
    
    return this.http.post<Jelentkezes>(this.apiUrl, formData);
  }
  
  // Jelentkezések lekérése
  getJelentkezesek(): Observable<Jelentkezes[]> {
    return this.http.get<Jelentkezes[]>(this.apiUrl);
  }
  
  // Egy specifikus jelentkezés lekérése ID alapján
  getJelentkezesById(id: number): Observable<Jelentkezes> {
    return this.http.get<Jelentkezes>(`${this.apiUrl}/${id}`);
  }
  
  // Egy állás jelentkezéseinek lekérése
  getJelentkezesekByAllasId(allasId: string): Observable<Jelentkezes[]> {
    return this.http.get<Jelentkezes[]>(`${this.apiUrl}?allasId=${allasId}`);
  }
  
  // Jelentkezés státuszának frissítése
  updateJelentkezesStatusz(id: number, statusz: string): Observable<Jelentkezes> {
    return this.http.patch<Jelentkezes>(`${this.apiUrl}/${id}`, { statusz });
  }
  
  // Aktív állások lekérése
  getAktivAllasok(): Observable<Allas[]> {
    return this.http.get<Allas[]>(`${this.allasApiUrl}?aktiv=true`);
  }
  
  // Egy specifikus állás lekérése ID alapján
  getAllasById(id: string): Observable<Allas> {
    return this.http.get<Allas>(`${this.allasApiUrl}/${id}`);
  }
}
