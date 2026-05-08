import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cart = inject(CartService);
  orderService = inject(OrderService);
  auth = inject(AuthService);
  router = inject(Router);

  step = signal<'address' | 'payment' | 'confirm'>('address');
  paymentMethod = 'card';
  error = '';

  address = { name: '', phone: '', line1: '', city: '', state: '', pin: '' };
  card = { number: '', expiry: '', cvv: '' };
  upi = '';

  nextStep() {
    if (this.step() === 'address') {
      if (!this.address.name || !this.address.phone || !this.address.line1 || !this.address.city || !this.address.pin) {
        this.error = 'Please fill all address fields.'; return;
      }
      this.error = ''; this.step.set('payment');
    } else if (this.step() === 'payment') {
      if (this.paymentMethod === 'card') {
        if (!this.card.number || !this.card.expiry || !this.card.cvv) { this.error = 'Fill all card details.'; return; }
      } else if (this.paymentMethod === 'upi') {
        if (!this.upi.includes('@')) { this.error = 'Enter a valid UPI ID.'; return; }
      }
      this.error = ''; this.step.set('confirm');
    }
  }

  placeOrder() {
    const label = this.paymentMethod === 'card' ? 'Credit/Debit Card' : this.paymentMethod === 'upi' ? `UPI (${this.upi})` : 'Cash on Delivery';
    this.orderService.placeOrder(this.cart.items(), this.cart.total(), label);
    this.cart.clear();
    this.router.navigate(['/orders']);
  }
}
