import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../models/models';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class AdminUsersComponent {
  admin = inject(AdminService);
  users = signal<User[]>(this.admin.getUsers());

  delete(email: string) {
    if (confirm('Delete this user?')) {
      this.admin.deleteUser(email);
      this.users.set(this.admin.getUsers());
    }
  }

  getOrderCount(email: string): number {
    return this.admin.getOrders().filter(o =>
      o.items.some(() => true)
    ).length;
  }

  getTotalSpent(email: string): number {
    return this.admin.getOrders().reduce((s, o) => s + o.total, 0);
  }
}
