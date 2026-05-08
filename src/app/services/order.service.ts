import { Injectable } from '@angular/core';
import { Order, CartItem } from '../models/models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  placeOrder(items: CartItem[], total: number, payment: string): Order {
    const order: Order = {
      id: 'ORD-' + Date.now(),
      items,
      total,
      date: new Date().toLocaleDateString(),
      status: 'Confirmed',
      payment
    };
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    return order;
  }

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }
}
