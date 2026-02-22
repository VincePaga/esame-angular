import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Pizza } from '../../components/card/card.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cart-hero">
      <div class="hero-content">
        <h1>Il tuo Carrello</h1>
        <p>Ultimo passo prima della felicità</p>
      </div>
    </section>

    <section class="container cart-section py-5">
      <div *ngIf="cart().length === 0" class="empty-state">
        <h3>Il carrello è vuoto</h3>
        <p>Aggiungi una pizza e rendi la giornata migliore.</p>
        <a class="primary-btn" routerLink="/menu">Vai al menu</a>
      </div>

      <div *ngIf="cart().length > 0" class="cart-layout">
        <div class="items-column">
          <div class="cart-item" *ngFor="let item of cart()">
            <div class="item-info">
              <h5>{{ item.name }}</h5>
              <span class="price">{{ item.price }}€</span>
            </div>

            <div class="item-controls">
              <button class="round-btn minus" (click)="remove(item)">−</button>
              <span class="qty">{{ item.quantity }}</span>
              <button class="round-btn plus" (click)="add(item)">+</button>
              <button class="remove-all" (click)="removeAll(item)">
                Rimuovi
              </button>
            </div>
          </div>
        </div>

        <div class="summary-column">
          <div class="summary-card">
            <h4>Riepilogo</h4>

            <div class="summary-row">
              <span>Articoli</span>
              <strong>{{ totalItems() }}</strong>
            </div>

            <div class="summary-row total">
              <span>Totale</span>
              <strong>{{ totalPrice() }}€</strong>
            </div>

            <button class="checkout-btn" (click)="checkout()">Paga ora</button>

            <button class="clear-btn" (click)="clearCart()">
              Svuota carrello
            </button>
          </div>
        </div>
      </div>
    </section>

    <div *ngIf="showThanks()" class="custom-modal">
      <div class="modal-card">
        <h3>Ordine completato</h3>
        <p>La tua pizza è ufficialmente in viaggio verso di te.</p>
        <div
          class="gap-3 d-flex flex-row align-items-center justify-content-center"
        >
          <button class="secondary-btn mt-2" routerLink="/menu">Menù</button>
          <button class="secondary-btn mt-2" (click)="closeModal()">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .cart-hero {
        height: 200px;
        background: linear-gradient(135deg, #c62828, #8b0000);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
      }

      .hero-content h1 {
        font-weight: 800;
        margin: 0;
      }

      .hero-content p {
        margin-top: 6px;
        opacity: 0.85;
      }

      .cart-section {
        margin-top: -60px;
      }

      .cart-layout {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
      }

      .items-column {
        flex: 1 1 60%;
      }

      .summary-column {
        flex: 1 1 30%;
      }

      .cart-item {
        background: linear-gradient(145deg, #fff8f0, #f3e4d2);
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 15px 40px rgba(60, 30, 10, 0.18);
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: transform 0.3s ease;
      }

      .cart-item:hover {
        transform: translateY(-4px);
      }

      .item-info h5 {
        margin: 0;
        font-weight: 700;
        color: #4a2a14;
      }

      .price {
        font-size: 0.9rem;
        color: #6d4c41;
      }

      .item-controls {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .round-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        font-weight: bold;
        font-size: 1.2rem;
        transition: all 0.25s ease;
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

      .qty {
        font-weight: 700;
        font-size: 1.1rem;
        color: #4a2a14;
      }

      .remove-all {
        background: transparent;
        border: none;
        color: #8d6e63;
        font-size: 0.85rem;
      }

      .remove-all:hover {
        color: #c62828;
      }

      .summary-card {
        background: linear-gradient(145deg, #fff3e0, #ffe0b2);
        padding: 30px;
        border-radius: 24px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        position: sticky;
        top: 100px;
      }

      .summary-card h4 {
        font-weight: 800;
        margin-bottom: 20px;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      .summary-row.total {
        font-size: 1.2rem;
        font-weight: 800;
      }

      .checkout-btn {
        width: 100%;
        padding: 12px;
        border-radius: 999px;
        border: none;
        font-weight: 700;
        background: linear-gradient(135deg, #43a047, #1b5e20);
        color: white;
        margin-top: 20px;
        transition: transform 0.25s ease;
      }

      .checkout-btn:hover {
        transform: scale(1.05);
      }

      .clear-btn {
        width: 100%;
        padding: 10px;
        margin-top: 12px;
        border-radius: 999px;
        border: 1px solid #8d6e63;
        background: transparent;
        font-weight: 600;
      }

      .empty-state {
        text-align: center;
        padding: 80px 0;
      }

      .primary-btn {
        display: inline-block;
        padding: 12px 24px;
        border-radius: 999px;
        background: linear-gradient(135deg, #d84315, #bf360c);
        color: white;
        text-decoration: none;
        font-weight: 700;
        transition: transform 0.25s ease;
      }

      .primary-btn:hover {
        transform: scale(1.08);
      }

      .secondary-btn {
        background: transparent;
        border: 1px solid #8d6e63;
        padding: 8px 20px;
        border-radius: 999px;
      }

      .custom-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
      }

      .modal-card {
        background: white;
        padding: 40px;
        border-radius: 24px;
        text-align: center;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.4s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class CartComponent {
  cartService = inject(CartService);
  router = inject(Router);

  cart = this.cartService.cart;
  showThanks = signal(false);

  add(pizza: Pizza) {
    this.cartService.addPizza(pizza);
  }

  remove(pizza: Pizza) {
    this.cartService.removePizza(pizza);
  }

  removeAll(pizza: Pizza) {
    this.cartService.removeAllFromCart(pizza.id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  totalItems(): number {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0);
  }

  totalPrice(): string {
    const total = this.cart().reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    return (Math.round(total * 100) / 100).toFixed(2);
  }

  checkout() {
    if (this.cart().length === 0) {
      return;
    }
    this.cartService.clearCart();
    this.cartService.restoreMenu();
    this.showThanks.set(true);
  }

  closeModal() {
    this.showThanks.set(false);
  }
}
