import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h2>Create Account</h2>
        <p class="sub">Join ShopZone today</p>
        @if (error) { <div class="error">{{ error }}</div> }
        <input [(ngModel)]="name" placeholder="Full Name" />
        <input [(ngModel)]="email" type="email" placeholder="Email" />
        <input [(ngModel)]="password" type="password" placeholder="Password (min 6 chars)" />
        <button (click)="signup()">Sign Up</button>
        <p class="switch">Already have an account? <a routerLink="/login">Login</a></p>
      </div>
    </div>
  `,
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name = ''; email = ''; password = ''; error = '';
  auth = inject(AuthService);
  router = inject(Router);

  signup() {
    if (!this.name || !this.email || !this.password) { this.error = 'All fields required.'; return; }
    if (this.password.length < 6) { this.error = 'Password must be at least 6 characters.'; return; }
    if (!this.auth.signup({ name: this.name, email: this.email, password: this.password })) {
      this.error = 'Email already registered.'; return;
    }
    this.router.navigate(['/products']);
  }
}
