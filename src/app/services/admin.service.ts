import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product, User, Order } from '../models/models';

const BASE_PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', description: 'Premium sound quality with noise cancellation.', category: 'Electronics', rating: 4.5, stock: 10 },
  { id: 2, name: 'Mechanical Keyboard', price: 129.99, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop', description: 'RGB backlit mechanical switches.', category: 'Electronics', rating: 4.7, stock: 5 },
  { id: 3, name: 'USB-C Hub', price: 49.99, image: 'https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=400&h=300&fit=crop', description: '7-in-1 multiport adapter.', category: 'Electronics', rating: 4.2, stock: 20 },
  { id: 4, name: 'Webcam HD', price: 89.99, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop', description: '1080p with built-in microphone.', category: 'Electronics', rating: 4.3, stock: 8 },
  { id: 5, name: 'Running Shoes', price: 59.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', description: 'Lightweight and breathable.', category: 'Fashion', rating: 4.6, stock: 15 },
  { id: 6, name: 'Backpack', price: 39.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', description: 'Water-resistant 30L backpack.', category: 'Fashion', rating: 4.1, stock: 12 },
  { id: 7, name: 'Coffee Maker', price: 69.99, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop', description: 'Brew perfect coffee every time.', category: 'Home', rating: 4.4, stock: 7 },
  { id: 8, name: 'Desk Lamp', price: 29.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop', description: 'LED with adjustable brightness.', category: 'Home', rating: 4.0, stock: 25 },
  { id: 9, name: 'Air Purifier', price: 119.99, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop', description: 'HEPA filter removes 99.97% of airborne particles.', category: 'Home', rating: 4.6, stock: 9 },
  { id: 10, name: 'Robot Vacuum', price: 199.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Auto-cleaning robot with smart mapping.', category: 'Home', rating: 4.5, stock: 6 },
  { id: 11, name: 'Microwave Oven', price: 89.99, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=300&fit=crop', description: '800W microwave with digital controls.', category: 'Home', rating: 4.3, stock: 11 },
  { id: 12, name: 'Electric Kettle', price: 34.99, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop', description: 'Rapid boil 1.7L stainless steel kettle.', category: 'Home', rating: 4.4, stock: 18 },
  { id: 13, name: 'Stand Mixer', price: 249.99, image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400&h=300&fit=crop', description: '5-quart bowl with 10 speed settings.', category: 'Home', rating: 4.8, stock: 4 },
  { id: 14, name: 'Air Fryer', price: 79.99, image: 'https://images.unsplash.com/photo-1648146956409-4b5b4e0e0e0e?w=400&h=300&fit=crop', description: '4L capacity, oil-free healthy cooking.', category: 'Home', rating: 4.5, stock: 14 },
  { id: 15, name: 'Blender', price: 54.99, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop', description: 'High-speed blender for smoothies and soups.', category: 'Home', rating: 4.2, stock: 16 },
  { id: 16, name: 'Toaster', price: 27.99, image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop', description: '2-slice toaster with 6 browning settings.', category: 'Home', rating: 4.1, stock: 22 },
];

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';
  private productsKey = 'admin_products';

  products = signal<Product[]>(this.loadProducts());

  constructor() {
    this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe({
      next: products => {
        this.products.set(products);
        this.saveProducts();
      },
      error: () => {
        // Keep the local demo products when the backend is not running.
      }
    });
  }

  private loadProducts(): Product[] {
    const saved = localStorage.getItem(this.productsKey);
    if (saved) {
      const parsed: Product[] = JSON.parse(saved);
      // Reset if still using old placeholder images
      if (parsed.some(p => p.image.includes('placehold.co')) || parsed.length < 16) {
        localStorage.removeItem(this.productsKey);
        return BASE_PRODUCTS;
      }
      return parsed;
    }
    return BASE_PRODUCTS;
  }

  private saveProducts() {
    localStorage.setItem(this.productsKey, JSON.stringify(this.products()));
  }

  addProduct(p: Omit<Product, 'id'>) {
    const id = Math.max(0, ...this.products().map(x => x.id)) + 1;
    this.products.update(list => [...list, { ...p, id }]);
    this.saveProducts();
  }

  updateProduct(updated: Product) {
    this.products.update(list => list.map(p => p.id === updated.id ? updated : p));
    this.saveProducts();
  }

  deleteProduct(id: number) {
    this.products.update(list => list.filter(p => p.id !== id));
    this.saveProducts();
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  deleteUser(email: string) {
    const users = this.getUsers().filter(u => u.email !== email);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }

  getSalesAnalytics() {
    const orders = this.getOrders();
    const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
    const totalOrders = orders.length;
    const avgOrder = totalOrders ? totalRevenue / totalOrders : 0;

    // Revenue by month
    const monthlyRevenue: Record<string, number> = {};
    orders.forEach(o => {
      const parts = o.date.split('/');
      const key = parts.length === 3 ? `${parts[0]}/${parts[2]}` : o.date;
      monthlyRevenue[key] = (monthlyRevenue[key] || 0) + o.total;
    });
    const monthly = Object.entries(monthlyRevenue)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, revenue]) => ({ month, revenue }));

    // Revenue by category
    const categoryRevenue: Record<string, number> = {};
    orders.forEach(o => o.items.forEach(i => {
      categoryRevenue[i.product.category] = (categoryRevenue[i.product.category] || 0) + i.product.price * i.quantity;
    }));
    const byCategory = Object.entries(categoryRevenue)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, revenue]) => ({ cat, revenue }));

    // Top products
    const productSales: Record<number, { name: string; qty: number; revenue: number }> = {};
    orders.forEach(o => o.items.forEach(i => {
      if (!productSales[i.product.id]) productSales[i.product.id] = { name: i.product.name, qty: 0, revenue: 0 };
      productSales[i.product.id].qty += i.quantity;
      productSales[i.product.id].revenue += i.product.price * i.quantity;
    }));
    const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    return { totalRevenue, totalOrders, avgOrder, monthly, byCategory, topProducts };
  }

  getInventory() {
    return this.products().map(p => ({
      ...p,
      status: p.stock === 0 ? 'Out of Stock' : p.stock <= 5 ? 'Low Stock' : 'In Stock'
    }));
  }
}
