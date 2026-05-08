import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class AdminInventoryComponent {
  admin = inject(AdminService);
  editingId = signal<number | null>(null);
  newStock: Record<number, number> = {};

  get inventory() { return this.admin.getInventory(); }

  startEdit(id: number, stock: number) {
    this.editingId.set(id);
    this.newStock[id] = stock;
  }

  saveStock(id: number) {
    const p = this.admin.products().find(p => p.id === id);
    if (p) this.admin.updateProduct({ ...p, stock: this.newStock[id] });
    this.editingId.set(null);
  }
}
