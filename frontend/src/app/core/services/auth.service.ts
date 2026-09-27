import { Injectable } from '@angular/core';
import { keycloak } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(): Promise<void> {
    return keycloak.login();
  }

  logout(): Promise<void> {
    return keycloak.logout();
  }

  isAuthenticated(): boolean {
    return !!keycloak.authenticated;
  }

  getToken(): string | undefined {
    return keycloak.token;
  }

  getClaims(): any {
    return keycloak.tokenParsed;
  }

  get userName(): string {
    return this.getClaims()?.name ?? '';
  }

  get email(): string {
    return this.getClaims()?.email ?? '';
  }

  get profilePicture(): string {
    return this.getClaims()?.picture ?? '';
  }
}