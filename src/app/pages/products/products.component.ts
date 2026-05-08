import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { RecommendationService } from '../../services/recommendation.service';
import { RecommendationComponent } from '../recommendation/recommendation.component';
import { SearchService } from '../../services/search.service';
import { OrderService } from '../../services/order.service';
import { AlertService } from '../../services/alert.service';
import { Product, Order } from '../../models/models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, RecommendationComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  recService = inject(RecommendationService);
  searchService = inject(SearchService);
  orderService = inject(OrderService);
  alertService = inject(AlertService);

  alertFilter = 'all';

  category = '';
  maxPrice = 300;
  minRating = 0;
  added = signal<number | null>(null);

  categories = this.productService.getCategories();

  get products(): Product[] {
    return this.productService.filter(this.searchService.query(), this.category, this.maxPrice, this.minRating);
  }

  get recommended(): Product[] {
    return this.recService.getRecommended();
  }

  get peopleAlsoBought(): Product[] {
    const cartIds = this.cartService.items().map(i => i.product.id);
    return this.recService.getPeopleAlsoBought(cartIds);
  }

  get recentOrders(): Order[] {
    return this.orderService.getOrders().slice(0, 3);
  }

  budget = signal<number>(200);
  editingBudget = signal(false);
  budgetInput = 200;

  get insights() {
    const orders = this.orderService.getOrders();
    if (orders.length === 0) return null;

    // Monthly summary — group by month/year
    const monthlyMap: Record<string, number> = {};
    orders.forEach(o => {
      const parts = o.date.split('/');
      const key = parts.length === 3 ? `${parts[0]}/${parts[2]}` : o.date;
      monthlyMap[key] = (monthlyMap[key] || 0) + o.total;
    });
    const monthly = Object.entries(monthlyMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-3)
      .map(([month, amt]) => ({ month, amt }));

    // Current month spend
    const now = new Date();
    const currentKey = `${now.getMonth() + 1}/${now.getFullYear()}`;
    const thisMonthSpent = monthlyMap[currentKey] || 0;

    // Category-wise spending
    const categorySpend: Record<string, number> = {};
    orders.forEach(o =>
      o.items.forEach(i => {
        categorySpend[i.product.category] = (categorySpend[i.product.category] || 0) + i.product.price * i.quantity;
      })
    );
    const totalCatSpend = Object.values(categorySpend).reduce((s, v) => s + v, 0);
    const categories = Object.entries(categorySpend)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => ({ cat, amt, pct: Math.round((amt / totalCatSpend) * 100) }));

    // Budget tracking
    const budgetVal = this.budget();
    const budgetPct = Math.min(Math.round((thisMonthSpent / budgetVal) * 100), 100);
    const budgetStatus = budgetPct >= 100 ? 'over' : budgetPct >= 80 ? 'warning' : 'safe';

    return { monthly, thisMonthSpent, categories, budgetVal, budgetPct, budgetStatus,
      totalSpent: orders.reduce((s, o) => s + o.total, 0), orderCount: orders.length };
  }

  saveBudget() {
    this.budget.set(this.budgetInput);
    this.editingBudget.set(false);
  }

  addToCart(product: Product) {
    this.cartService.add(product);
    this.added.set(product.id);
    setTimeout(() => this.added.set(null), 1500);
  }

  stars(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(rating));
  }
}
