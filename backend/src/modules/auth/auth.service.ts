import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  name: string;
  picture: string;
  email?: string;
}

interface JwtClaims {
  sub: string;
  exp: number;

  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;

  email?: string;

  picture?: string;
  avatar_url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';

  private readonly userSubject =
    new BehaviorSubject<UserProfile | null>(null);

  readonly user$ = this.userSubject.asObservable();

  constructor() {
    if (this.isAuthenticated()) {
      this.loadUser();
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
    this.loadUser();
  }

  clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const claims = this.getClaims();

    if (!claims) {
      return false;
    }

    return claims.exp > Math.floor(Date.now() / 1000);
  }

  isTokenExpired(): boolean {
    const claims = this.getClaims();

    if (!claims) {
      return true;
    }

    return claims.exp <= Math.floor(Date.now() / 1000);
  }

  login(): void {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/callback`
    );

    // Replace with your actual OAuth provider URL
    window.location.href =
      'http://localhost:8080/realms/starwars/protocol/openid-connect/auth' +
      '?client_id=frontend-app' +
      '&response_type=code' +
      '&scope=openid profile email' +
      `&redirect_uri=${redirectUri}`;
  }

  logout(): void {
    this.clearToken();
    this.userSubject.next(null);
  }

  getClaims(): JwtClaims | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];

      return JSON.parse(atob(payload)) as JwtClaims;
    } catch {
      return null;
    }
  }

  loadUser(): void {
    const claims = this.getClaims();

    if (!claims) {
      this.userSubject.next(null);
      return;
    }

    const fullName =
      claims.name ??
      [claims.given_name, claims.family_name]
        .filter(Boolean)
        .join(' ');

    this.userSubject.next({
      name:
        fullName ||
        claims.preferred_username ||
        claims.email ||
        'Unknown User',

      picture:
        claims.picture ||
        claims.avatar_url ||
        '/assets/default-avatar.png',

      email: claims.email,
    });
  }

  get currentUser(): UserProfile | null {
    return this.userSubject.value;
  }

  get userName(): string {
    return this.currentUser?.name ?? '';
  }

  get profilePicture(): string {
    return this.currentUser?.picture ?? '';
  }

  get email(): string {
    return this.currentUser?.email ?? '';
  }
}