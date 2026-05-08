import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orderService = inject(OrderService);
  orders: Order[] = this.orderService.getOrders();
  expanded: string | null = null;

  toggle(id: string) { this.expanded = this.expanded === id ? null : id; }
}
