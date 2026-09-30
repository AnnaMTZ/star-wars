import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  constructor(public auth: AuthService) {}

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }
}