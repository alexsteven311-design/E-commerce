import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h2>Welcome Back</h2>
        <p class="sub">Login to your account</p>
        @if (error) { <div class="error">{{ error }}</div> }
        <input [(ngModel)]="email" type="email" placeholder="Email" />
        <input [(ngModel)]="password" type="password" placeholder="Password" />
        <button (click)="login()">Login</button>
        <p class="switch">Don't have an account? <a routerLink="/signup">Sign Up</a></p>
      </div>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = ''; password = ''; error = '';
  auth = inject(AuthService);
  router = inject(Router);

  login() {
    if (!this.email || !this.password) { this.error = 'All fields required.'; return; }
    if (!this.auth.login(this.email, this.password)) { this.error = 'Invalid email or password.'; return; }
    this.router.navigate(['/products']);
  }
}
