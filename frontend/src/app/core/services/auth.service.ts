import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal(false);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.isAuthenticated.set(!!token);
  }

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>('http://localhost:3000/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.accessToken);
          this.isAuthenticated.set(true);
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}