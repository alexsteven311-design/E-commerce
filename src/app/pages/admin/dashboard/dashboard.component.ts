import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class AdminDashboardComponent {
  admin = inject(AdminService);
  analytics = this.admin.getSalesAnalytics();
  users = this.admin.getUsers();
  products = this.admin.products();
  lowStock = this.products.filter(p => p.stock <= 5);
}
