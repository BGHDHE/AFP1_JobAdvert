// src/app/services/registration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  role?: string;
  location?: string;
  phone?: string;
  hasJob?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:3000/api'; // backend URL

  constructor(private http: HttpClient) {}

  // Regisztráció a backendre
  register(user: RegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login (maradhat így)
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
