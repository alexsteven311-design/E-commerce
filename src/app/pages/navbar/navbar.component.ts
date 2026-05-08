import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  template: `
    <nav class="navbar">
      <a routerLink="/products" class="brand">🛒 ShopZone</a>

      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input [ngModel]="searchService.query()" (ngModelChange)="searchService.query.set($event)" placeholder="Search products..." />
      </div>

      <div class="nav-links">
        <a routerLink="/products" routerLinkActive="active">Shop</a>
        @if (auth.currentUser()) {
          <a routerLink="/cart" routerLinkActive="active">Cart <span class="badge">{{ cart.count() }}</span></a>
          <a routerLink="/orders" routerLinkActive="active">Orders</a>
          <a routerLink="/insights" routerLinkActive="active">Insights</a>

          <!-- Alerts Bell -->
          <div class="alerts-wrap">
            <button class="bell-btn" (click)="toggleAlerts()">
              🔔
              @if (alertService.getAlerts().length > 0) {
                <span class="alert-badge">{{ alertService.getAlerts().length }}</span>
              }
            </button>

            @if (showAlerts()) {
              <div class="alerts-dropdown">
                <div class="alerts-header">
                  <span>Alerts</span>
                  @if (alertService.getAlerts().length > 0) {
                    <button class="clear-all" (click)="alertService.dismissAll()">Clear all</button>
                  }
                </div>
                @if (alertService.getAlerts().length === 0) {
                  <div class="no-alerts">✅ You're all caught up!</div>
                }
                @for (alert of alertService.getAlerts(); track alert.id) {
                  <div class="alert-item" [class.price]="alert.type === 'price_drop'" [class.budget]="alert.type === 'budget'" [class.stock]="alert.type === 'back_in_stock'">
                    <div class="alert-icon">
                      {{ alert.type === 'price_drop' ? '📉' : alert.type === 'budget' ? '💸' : '⚡' }}
                    </div>
                    <div class="alert-body">
                      <p class="alert-title">{{ alert.title }}</p>
                      <p class="alert-msg">{{ alert.message }}</p>
                      <span class="alert-time">{{ alert.time }}</span>
                    </div>
                    <button class="dismiss-btn" (click)="alertService.dismiss(alert.id)">✕</button>
                  </div>
                }
              </div>
            }
          </div>

          <span class="user">Hi, {{ auth.currentUser()!.name }}</span>
          <button (click)="logout()">Logout</button>
        } @else {
          <a routerLink="/login" routerLinkActive="active">Login</a>
          <a routerLink="/signup" class="btn-signup">Sign Up</a>
        }
      </div>
    </nav>
  `,
  styles: [`
    .navbar { display:flex; justify-content:space-between; align-items:center; padding:14px 32px; background:#1a1a2e; color:white; position:sticky; top:0; z-index:100; gap:20px; }
    .brand { color:white; text-decoration:none; font-size:20px; font-weight:bold; white-space:nowrap; }
    .search-box { display:flex; align-items:center; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:24px; padding:6px 14px; gap:8px; flex:1; max-width:400px; }
    .search-box:focus-within { background:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.4); }
    .search-icon { font-size:14px; opacity:0.7; }
    .search-box input { background:transparent; border:none; outline:none; color:white; font-size:14px; width:100%; }
    .search-box input::placeholder { color:rgba(255,255,255,0.5); }
    .nav-links { display:flex; align-items:center; gap:20px; }
    .nav-links a { color:#ccc; text-decoration:none; font-size:14px; white-space:nowrap; }
    .nav-links a.active, .nav-links a:hover { color:white; }
    .badge { background:#e94560; border-radius:10px; padding:1px 7px; font-size:12px; margin-left:4px; }
    .user { color:#aaa; font-size:13px; white-space:nowrap; }
    .btn-signup { background:#e94560; padding:6px 14px; border-radius:6px; color:white !important; }
    button { background:#e94560; color:white; border:none; padding:6px 14px; border-radius:6px; cursor:pointer; font-size:13px; }

    /* Bell */
    .alerts-wrap { position:relative; }
    .bell-btn { background:transparent; border:none; font-size:18px; cursor:pointer; padding:4px; position:relative; line-height:1; }
    .bell-btn:hover { background:transparent; }
    .alert-badge { position:absolute; top:-4px; right:-4px; background:#e94560; color:white; font-size:10px; font-weight:bold; border-radius:10px; padding:1px 5px; min-width:16px; text-align:center; }

    /* Dropdown */
    .alerts-dropdown { position:absolute; right:0; top:calc(100% + 10px); width:320px; background:white; border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,0.18); overflow:hidden; z-index:200; }
    .alerts-header { display:flex; justify-content:space-between; align-items:center; padding:14px 16px; border-bottom:1px solid #f0f0f0; }
    .alerts-header span { font-size:14px; font-weight:700; color:#1a1a2e; }
    .clear-all { background:transparent; color:#e94560; border:none; font-size:12px; cursor:pointer; padding:0; }
    .clear-all:hover { background:transparent; text-decoration:underline; }
    .no-alerts { padding:24px; text-align:center; color:#aaa; font-size:13px; }

    .alert-item { display:flex; align-items:flex-start; gap:10px; padding:12px 16px; border-bottom:1px solid #f9f9f9; transition:background 0.15s; }
    .alert-item:hover { background:#fafafa; }
    .alert-item.price { border-left:3px solid #27ae60; }
    .alert-item.budget { border-left:3px solid #e94560; }
    .alert-item.stock { border-left:3px solid #f5a623; }
    .alert-icon { font-size:20px; flex-shrink:0; margin-top:2px; }
    .alert-body { flex:1; }
    .alert-title { font-size:13px; font-weight:600; color:#1a1a2e; margin:0 0 2px; }
    .alert-msg { font-size:12px; color:#666; margin:0 0 4px; line-height:1.4; }
    .alert-time { font-size:11px; color:#bbb; }
    .dismiss-btn { background:transparent; color:#ccc; border:none; font-size:14px; cursor:pointer; padding:2px 4px; flex-shrink:0; }
    .dismiss-btn:hover { background:transparent; color:#e94560; }
  `]
})
export class NavbarComponent {
  auth = inject(AuthService);
  cart = inject(CartService);
  router = inject(Router);
  searchService = inject(SearchService);
  alertService = inject(AlertService);

  showAlerts = signal(false);

  toggleAlerts() { this.showAlerts.update(v => !v); }
  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
