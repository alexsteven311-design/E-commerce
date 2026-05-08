import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '../../models/models';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  template: `
    @if (products.length > 0) {
      <div class="rec-section">
        <div class="rec-header">
          <span class="rec-icon">{{ icon }}</span>
          <div>
            <h3>{{ title }}</h3>
            <p>{{ subtitle }}</p>
          </div>
        </div>
        <div class="rec-strip">
          @for (p of products; track p.id) {
            <div class="rec-card">
              <img [src]="p.image" [alt]="p.name" />
              <div class="rec-body">
                <span class="rec-tag">{{ p.category }}</span>
                <h4>{{ p.name }}</h4>
                <div class="rec-stars">{{ stars(p.rating) }} <span>{{ p.rating }}</span></div>
                <div class="rec-footer">
                  <span class="rec-price">\${{ p.price.toFixed(2) }}</span>
                  <button (click)="addToCart(p)" [class.added]="added() === p.id">
                    {{ added() === p.id ? '✓' : '+ Cart' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    }
  `,
  styleUrl: './recommendation.component.css'
})
export class RecommendationComponent {
  @Input() products: Product[] = [];
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = '✨';

  cart = inject(CartService);
  added = signal<number | null>(null);

  addToCart(p: Product) {
    this.cart.add(p);
    this.added.set(p.id);
    setTimeout(() => this.added.set(null), 1500);
  }

  stars(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  }
}
