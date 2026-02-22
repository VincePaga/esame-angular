import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="menu-card" (click)="select.emit(pizza)">
      <div class="image-wrapper">
        <img [src]="pizza!.image" [alt]="pizza!.name" />
        <div class="price-tag">{{ pizza!.price }}€</div>
      </div>

      <div class="content">
        <h5 class="title">{{ pizza!.name }}</h5>

        <div class="actions">
          <button
            class="icon-btn minus"
            (click)="removeFromCart(pizza); $event.stopPropagation()"
            [disabled]="quantityFor(pizza.id) === 0"
          >
            −
          </button>

          <span class="quantity">
            {{ quantityFor(pizza.id) }}
          </span>

          <button
            class="icon-btn plus"
            (click)="addToCart(pizza); $event.stopPropagation()"
          >
            +
          </button>
        </div>

        <button
          class="remove-btn"
          (click)="removeFromMenu(pizza); $event.stopPropagation()"
        >
          Rimuovi dal menu
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .menu-card {
        width: 20rem;
        border-radius: 24px;
        overflow: hidden;
        background: linear-gradient(145deg, #fff8f0, #f3e4d2);
        box-shadow: 0 15px 35px rgba(60, 30, 10, 0.15);
        transition: all 0.35s ease;
        cursor: pointer;
        display: flex;
        flex-direction: column;
      }

      .menu-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(60, 30, 10, 0.25);
      }

      .image-wrapper {
        position: relative;
        height: 200px;
        overflow: hidden;
      }

      .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }

      .menu-card:hover img {
        transform: scale(1.1);
      }

      .price-tag {
        position: absolute;
        top: 15px;
        right: 15px;
        background: linear-gradient(135deg, #c62828, #8b0000);
        color: white;
        padding: 6px 14px;
        border-radius: 999px;
        font-weight: 700;
        font-size: 0.9rem;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
      }

      .content {
        padding: 18px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .title {
        font-weight: 800;
        font-size: 1.1rem;
        color: #4a2a14;
        margin: 0;
      }

      .description {
        font-size: 0.9rem;
        color: #6d4c41;
        line-height: 1.5;
      }

      .actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-top: 8px;
      }

      .icon-btn {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: none;
        font-weight: bold;
        font-size: 1.2rem;
        transition: all 0.25s ease;
      }

      .icon-btn.plus {
        background: linear-gradient(135deg, #d84315, #bf360c);
        color: white;
      }

      .icon-btn.minus {
        background: #fbe9e7;
        color: #c62828;
      }

      .icon-btn:hover {
        transform: scale(1.15);
      }

      .quantity {
        font-weight: 700;
        font-size: 1rem;
        color: #4a2a14;
      }

      .remove-btn {
        margin-top: 6px;
        background: transparent;
        border: 1px solid #d7ccc8;
        border-radius: 10px;
        padding: 6px;
        font-size: 0.8rem;
        color: #6d4c41;
        transition: all 0.25s ease;
      }

      .remove-btn:hover {
        background: #f5e6d3;
        border-color: #bcaaa4;
      }
    `,
  ],
})
export class CardComponent {
  private cartService = inject(CartService);

  @Input() pizza!: Pizza;
  @Input() showDescription = true;
  @Output() select = new EventEmitter<Menu>();

  removeFromMenu(pizza: Pizza) {
    this.cartService.removeFromMenu(pizza.id);
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

export interface Pizza {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export type Menu = Pizza;
