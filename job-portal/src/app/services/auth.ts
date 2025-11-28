import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) this.userSubject.next(JSON.parse(savedUser));
  }

  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getRole(): string | null {
    return this.userSubject.value?.role ?? null;
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }
}
