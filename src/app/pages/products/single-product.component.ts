import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Pizza } from '../../components/card/card.component';
import { inject } from '@angular/core';


@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="hero-overlay">
        <h1>Dettaglio Pizza</h1>
        <p>Esperienza gourmet digitale</p>
      </div>
    </section>

    <section class="container product-section py-5">
      <div *ngIf="pizza() as pizza; else notFound">
        <div class="product-card">
          <div class="image-side">
            <img [src]="pizza.image" [alt]="pizza.name" />
            <div class="floating-price">{{ pizza.price }}€</div>
          </div>

          <div class="info-side">
            <h2 class="product-title">{{ pizza.name }}</h2>
            <p class="product-description">
              {{ pizza.description }}
            </p>

            <div class="cart-controls">
              <button
                class="round-btn minus"
                (click)="removeFromCart(pizza)"
                [disabled]="quantityFor(pizza.id) === 0"
              >
                −
              </button>

              <div class="quantity-box">
                {{ quantityFor(pizza.id) }}
                <span>nel carrello</span>
              </div>

              <button class="round-btn plus" (click)="addToCart(pizza)">
                +
              </button>
            </div>

            <a class="back-btn mt-4" routerLink="/menu"> ← Torna al menu </a>
          </div>
        </div>
      </div>

      <ng-template #notFound>
        <div class="not-found">
          <h3>Pizza non trovata</h3>
          <a class="back-btn" routerLink="/menu">Torna al menu</a>
        </div>
      </ng-template>
    </section>
  `,
  styles: [
    `
      .hero {
        height: 200px;
        background: linear-gradient(135deg, #c62828, #8b0000);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
      }

      .hero-overlay h1 {
        font-weight: 800;
        margin: 0;
      }

      .hero-overlay p {
        margin: 4px 0 0;
        opacity: 0.9;
      }

      .product-section {
        margin-top: -60px;
      }

      .product-card {
        background: linear-gradient(145deg, #fff8f0, #f3e4d2);
        border-radius: 28px;
        box-shadow: 0 25px 60px rgba(60, 30, 10, 0.25);
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        transition: transform 0.4s ease;
      }

      .product-card:hover {
        transform: translateY(-6px);
      }

      .image-side {
        flex: 1 1 50%;
        position: relative;
        min-height: 350px;
        overflow: hidden;
      }

      .image-side img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .product-card:hover img {
        transform: scale(1.08);
      }

      .floating-price {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #ff7043, #bf360c);
        color: white;
        padding: 10px 18px;
        border-radius: 999px;
        font-size: 1.2rem;
        font-weight: 800;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
      }

      .info-side {
        flex: 1 1 50%;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .product-title {
        font-size: 2rem;
        font-weight: 800;
        color: #4a2a14;
        margin-bottom: 16px;
      }

      .product-description {
        font-size: 1rem;
        color: #6d4c41;
        line-height: 1.6;
        margin-bottom: 30px;
      }

      .cart-controls {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .round-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        font-size: 1.5rem;
        font-weight: bold;
        transition: all 0.3s ease;
      }

      .round-btn.plus {
        background: linear-gradient(135deg, #d84315, #bf360c);
        color: white;
      }

      .round-btn.minus {
        background: #fbe9e7;
        color: #c62828;
      }

      .round-btn:hover {
        transform: scale(1.15);
      }

      .quantity-box {
        font-weight: 700;
        font-size: 1.1rem;
        color: #4a2a14;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .quantity-box span {
        font-size: 0.75rem;
        font-weight: 400;
        color: #8d6e63;
      }

      .back-btn {
        text-decoration: none;
        font-weight: 600;
        color: #6d4c41;
        transition: all 0.25s ease;
      }

      .back-btn:hover {
        color: #c62828;
      }

      .not-found {
        text-align: center;
        padding: 80px 0;
      }
    `,
  ],
})
export class SingleProductComponent {
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  menuUrl = 'https://my-json-server.typicode.com/zoelounge/menupizza/cards';

  pizza = signal<Pizza | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.params['id']);
    this.loadPizza(id);
  }
  private loadPizza(id: number | null) {
    if (!id) {
      this.pizza.set(null);
      return;
    }

    this.http.get<Pizza[]>(this.menuUrl).subscribe((result) => {
      const found = result.find((p) => p.id === id) ?? null;
      this.pizza.set(found);
    });
  }

  addToCart(pizza: Pizza) {
    this.cartService.addPizza(pizza);
  }

  removeFromCart(pizza: Pizza) {
    this.cartService.removePizza(pizza);
  }

  quantityFor(pizzaId: number): number {
    return this.cartService.quantityFor(pizzaId);
  }
}
