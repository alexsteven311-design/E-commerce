import { Injectable } from '@angular/core';
import { Product } from '../models/models';
import { OrderService } from './order.service';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  constructor(private orderService: OrderService, private productService: ProductService) {}

  // Recommended For You: based on categories from past orders, sorted by rating
  getRecommended(excludeIds: number[] = [], limit = 4): Product[] {
    const orders = this.orderService.getOrders();
    const all = this.productService.getAll();

    if (orders.length === 0) {
      // No history: return top rated products
      return [...all]
        .filter(p => !excludeIds.includes(p.id))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
    }

    // Count category frequency from order history
    const categoryCount: Record<string, number> = {};
    orders.forEach(order =>
      order.items.forEach(item => {
        categoryCount[item.product.category] = (categoryCount[item.product.category] || 0) + item.quantity;
      })
    );

    const orderedProductIds = new Set(orders.flatMap(o => o.items.map(i => i.product.id)));

    return all
      .filter(p => !excludeIds.includes(p.id) && !orderedProductIds.has(p.id))
      .sort((a, b) => {
        const scoreA = (categoryCount[a.category] || 0) * 2 + a.rating;
        const scoreB = (categoryCount[b.category] || 0) * 2 + b.rating;
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  // People Also Bought: products that appear in the same orders as the given product ids
  getPeopleAlsoBought(productIds: number[], limit = 4): Product[] {
    const orders = this.orderService.getOrders();
    const all = this.productService.getAll();

    if (orders.length === 0 || productIds.length === 0) return [];

    // Find orders that contain any of the given products
    const coCount: Record<number, number> = {};
    orders.forEach(order => {
      const orderIds = order.items.map(i => i.product.id);
      const hasMatch = orderIds.some(id => productIds.includes(id));
      if (hasMatch) {
        orderIds
          .filter(id => !productIds.includes(id))
          .forEach(id => { coCount[id] = (coCount[id] || 0) + 1; });
      }
    });

    return all
      .filter(p => coCount[p.id])
      .sort((a, b) => (coCount[b.id] || 0) - (coCount[a.id] || 0) || b.rating - a.rating)
      .slice(0, limit);
  }
}
