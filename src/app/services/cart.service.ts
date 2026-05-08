import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);

  total = computed(() => this.items().reduce((s, i) => s + i.product.price * i.quantity, 0));
  count = computed(() => this.items().reduce((s, i) => s + i.quantity, 0));

  add(product: Product) {
    const current = this.items();
    const idx = current.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      const updated = [...current];
      updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
      this.items.set(updated);
    } else {
      this.items.set([...current, { product, quantity: 1 }]);
    }
  }

  remove(productId: number) {
    this.items.set(this.items().filter(i => i.product.id !== productId));
  }

  updateQty(productId: number, qty: number) {
    if (qty < 1) { this.remove(productId); return; }
    this.items.set(this.items().map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  }

  clear() { this.items.set([]); }
}
