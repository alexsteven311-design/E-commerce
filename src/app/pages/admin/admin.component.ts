import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <div class="sidebar-brand">🛠️ Admin Panel</div>
        <nav>
          <a routerLink="/admin/dashboard" routerLinkActive="active">📊 Dashboard</a>
          <a routerLink="/admin/products" routerLinkActive="active">📦 Products</a>
          <a routerLink="/admin/users" routerLinkActive="active">👥 Users</a>
          <a routerLink="/admin/orders" routerLinkActive="active">🧾 Orders</a>
          <a routerLink="/admin/inventory" routerLinkActive="active">📈 Inventory</a>
        </nav>
        <a routerLink="/products" class="back-link">← Back to Store</a>
      </aside>
      <main class="admin-main">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .admin-shell { display:flex; min-height:calc(100vh - 60px); }
    .admin-sidebar { width:220px; background:#1a1a2e; display:flex; flex-direction:column; padding:24px 0; position:sticky; top:60px; height:calc(100vh - 60px); flex-shrink:0; }
    .sidebar-brand { color:white; font-size:16px; font-weight:700; padding:0 20px 24px; border-bottom:1px solid rgba(255,255,255,0.1); }
    nav { display:flex; flex-direction:column; padding:16px 0; flex:1; }
    nav a { color:rgba(255,255,255,0.6); text-decoration:none; padding:12px 20px; font-size:14px; transition:all 0.2s; }
    nav a:hover { color:white; background:rgba(255,255,255,0.08); }
    nav a.active { color:white; background:rgba(233,69,96,0.3); border-right:3px solid #e94560; }
    .back-link { color:rgba(255,255,255,0.4); text-decoration:none; padding:16px 20px; font-size:13px; border-top:1px solid rgba(255,255,255,0.1); }
    .back-link:hover { color:white; }
    .admin-main { flex:1; background:#f5f5f5; overflow-y:auto; }
  `]
})
export class AdminComponent {}
