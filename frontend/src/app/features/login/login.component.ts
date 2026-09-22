// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="login()">
      <input [(ngModel)]="username" name="username" />
      <input
        [(ngModel)]="password"
        name="password"
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService
      .login(this.username, this.password)
      .subscribe({
        next: () => this.router.navigate(['/people']),
      });
  }
}