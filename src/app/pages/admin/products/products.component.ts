import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../models/models';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class AdminProductsComponent {
  admin = inject(AdminService);
  
  showForm = signal(false);
  editMode = signal(false);
  
  form: Partial<Product> = this.resetForm();

  resetForm(): Partial<Product> {
    return { name: '', price: 0, image: '', description: '', category: '', rating: 0, stock: 0 };
  }

  openAdd() {
    this.form = this.resetForm();
    this.editMode.set(false);
    this.showForm.set(true);
  }

  openEdit(p: Product) {
    this.form = { ...p };
    this.editMode.set(true);
    this.showForm.set(true);
  }

  save() {
    if (this.editMode()) {
      this.admin.updateProduct(this.form as Product);
    } else {
      this.admin.addProduct(this.form as Omit<Product, 'id'>);
    }
    this.showForm.set(false);
  }

  delete(id: number) {
    if (confirm('Delete this product?')) {
      this.admin.deleteProduct(id);
    }
  }
}
