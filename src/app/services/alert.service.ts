import { Injectable, computed, signal } from '@angular/core';
import { Alert } from '../models/models';
import { OrderService } from './order.service';
import { ProductService } from './product.service';

// Simulated previous prices for price drop detection
const PREV_PRICES: Record<number, number> = {
  1: 99.99,  // Headphones was $99.99
  2: 149.99, // Keyboard was $149.99
  5: 79.99,  // Running Shoes was $79.99
  7: 89.99,  // Coffee Maker was $89.99
};

// Low stock threshold
const LOW_STOCK = 5;

@Injectable({ providedIn: 'root' })
export class AlertService {
  private dismissed = signal<Set<string>>(
    new Set(JSON.parse(localStorage.getItem('dismissedAlerts') || '[]'))
  );

  constructor(private orderService: OrderService, private productService: ProductService) {}

  getAlerts(): Alert[] {
    const alerts: Alert[] = [];
    const products = this.productService.getAll();
    const budget = Number(localStorage.getItem('budget') || 200);

    // Price drop alerts
    products.forEach(p => {
      if (PREV_PRICES[p.id] && p.price < PREV_PRICES[p.id]) {
        const drop = PREV_PRICES[p.id] - p.price;
        const pct = Math.round((drop / PREV_PRICES[p.id]) * 100);
        alerts.push({
          id: `price_drop_${p.id}`,
          type: 'price_drop',
          title: `Price Drop: ${p.name}`,
          message: `Down ${pct}% — now $${p.price.toFixed(2)} (was $${PREV_PRICES[p.id].toFixed(2)})`,
          time: 'Today'
        });
      }
    });

    // Budget exceeded alert
    const orders = this.orderService.getOrders();
    const now = new Date();
    const currentKey = `${now.getMonth() + 1}/${now.getFullYear()}`;
    const thisMonthSpent = orders
      .filter(o => {
        const parts = o.date.split('/');
        return parts.length === 3 && `${parts[0]}/${parts[2]}` === currentKey;
      })
      .reduce((s, o) => s + o.total, 0);

    if (thisMonthSpent >= budget) {
      alerts.push({
        id: `budget_exceeded_${currentKey}`,
        type: 'budget',
        title: 'Budget Exceeded!',
        message: `You've spent $${thisMonthSpent.toFixed(2)} this month, exceeding your $${budget} budget.`,
        time: 'This month'
      });
    } else if (thisMonthSpent >= budget * 0.8) {
      alerts.push({
        id: `budget_warning_${currentKey}`,
        type: 'budget',
        title: 'Budget Warning',
        message: `You've used ${Math.round((thisMonthSpent / budget) * 100)}% of your $${budget} monthly budget.`,
        time: 'This month'
      });
    }

    // Low stock / back in stock alerts
    products.filter(p => p.stock <= LOW_STOCK).forEach(p => {
      alerts.push({
        id: `low_stock_${p.id}`,
        type: 'back_in_stock',
        title: `Only ${p.stock} left: ${p.name}`,
        message: `Hurry! Only ${p.stock} unit${p.stock > 1 ? 's' : ''} remaining in stock.`,
        time: 'Now'
      });
    });

    return alerts.filter(a => !this.dismissed().has(a.id));
  }

  unreadCount = computed(() => this.getAlerts().length);

  dismiss(id: string) {
    const updated = new Set(this.dismissed());
    updated.add(id);
    this.dismissed.set(updated);
    localStorage.setItem('dismissedAlerts', JSON.stringify([...updated]));
  }

  dismissAll() {
    const ids = this.getAlerts().map(a => a.id);
    const updated = new Set([...this.dismissed(), ...ids]);
    this.dismissed.set(updated);
    localStorage.setItem('dismissedAlerts', JSON.stringify([...updated]));
  }
}
