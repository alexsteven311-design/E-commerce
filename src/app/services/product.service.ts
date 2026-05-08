import { Injectable, inject } from '@angular/core';
import { Product } from '../models/models';
import { AdminService } from './admin.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private admin = inject(AdminService);

  getAll(): Product[] {
    return this.admin.products();
  }

  getCategories(): string[] {
    return [...new Set(this.getAll().map(p => p.category))];
  }

  filter(search: string, category: string, maxPrice: number, minRating: number): Product[] {
    return this.getAll().filter(p =>
      (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())) &&
      (!category || p.category === category) &&
      p.price <= maxPrice &&
      p.rating >= minRating
    );
  }
}
