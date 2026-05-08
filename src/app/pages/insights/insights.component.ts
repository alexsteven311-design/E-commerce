import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent {
  orderService = inject(OrderService);

  activeTab: 'monthly' | 'category' | 'budget' = 'monthly';

  budget = signal<number>(Number(localStorage.getItem('budget') || 200));
  editingBudget = signal(false);
  budgetInput = this.budget();

  get insights() {
    const orders = this.orderService.getOrders();
    if (orders.length === 0) return null;

    // Monthly summary
    const monthlyMap: Record<string, number> = {};
    const monthlyCount: Record<string, number> = {};
    orders.forEach(o => {
      const parts = o.date.split('/');
      const key = parts.length === 3 ? `${parts[0]}/${parts[2]}` : o.date;
      monthlyMap[key] = (monthlyMap[key] || 0) + o.total;
      monthlyCount[key] = (monthlyCount[key] || 0) + 1;
    });
    const allMonthly = Object.entries(monthlyMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, amt]) => ({ month, amt, count: monthlyCount[month] }));
    const maxMonthly = Math.max(...allMonthly.map(m => m.amt));

    // Current month
    const now = new Date();
    const currentKey = `${now.getMonth() + 1}/${now.getFullYear()}`;
    const thisMonthSpent = monthlyMap[currentKey] || 0;

    // Category spending
    const categorySpend: Record<string, number> = {};
    const categoryCount: Record<string, number> = {};
    orders.forEach(o =>
      o.items.forEach(i => {
        categorySpend[i.product.category] = (categorySpend[i.product.category] || 0) + i.product.price * i.quantity;
        categoryCount[i.product.category] = (categoryCount[i.product.category] || 0) + i.quantity;
      })
    );
    const totalCatSpend = Object.values(categorySpend).reduce((s, v) => s + v, 0);
    const categories = Object.entries(categorySpend)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => ({ cat, amt, count: categoryCount[cat], pct: Math.round((amt / totalCatSpend) * 100) }));

    // Budget
    const budgetVal = this.budget();
    const rawPct = (thisMonthSpent / budgetVal) * 100;
    const budgetPct = Math.min(Math.round(rawPct), 100);
    const budgetStatus = rawPct >= 100 ? 'over' : rawPct >= 80 ? 'warning' : 'safe';
    const remaining = Math.max(budgetVal - thisMonthSpent, 0);

    const totalSpent = orders.reduce((s, o) => s + o.total, 0);
    const avgOrder = totalSpent / orders.length;

    return {
      allMonthly, maxMonthly, thisMonthSpent, categories, totalCatSpend,
      budgetVal, budgetPct, budgetStatus, remaining, rawPct,
      totalSpent, avgOrder, orderCount: orders.length
    };
  }

  saveBudget() {
    this.budget.set(this.budgetInput);
    localStorage.setItem('budget', String(this.budgetInput));
    this.editingBudget.set(false);
  }

  private readonly CAT_COLORS: Record<string, string> = {
    Electronics: '#4f46e5',
    Fashion: '#e94560',
    Home: '#f5a623',
    Sports: '#27ae60',
    Books: '#0ea5e9',
  };

  catColor(cat: string): string {
    return this.CAT_COLORS[cat] || '#888';
  }
}
