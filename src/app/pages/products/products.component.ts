import {
  Component,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CardComponent, Menu, Pizza } from '../../components/card/card.component';
import { CartService } from '../../services/cart.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="menu-hero">
      <div class="hero-content">
        <h1>Il nostro Menu</h1>
        <p>Scegli la tua pizza preferita e aggiungila al carrello.</p>
      </div>
    </section>

    <section class="menu-section container py-5">
      <div class="menu-grid">
        <div class="menu-card" *ngFor="let pizza of getVisiblePizzas()">
          <app-card
            [pizza]="pizza"
            [showDescription]="true"
            (select)="goToDetails($event)"
          ></app-card>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .menu-hero {
        background: linear-gradient(135deg, #c62828, #8b0000);
        height: 200px;
        text-align: center;
        padding-top: 50px;
        border-bottom: 1px solid var(--border);
        color: #ffffff;
      }

      .hero-content h1 {
        font-size: 2.5rem;
        font-weight: 900;
        margin-bottom: 12px;
      }

      .hero-content p {
        font-size: 1.1rem;
        opacity: 0.85;
      }

      .menu-section {
        margin-top: -60px;
      }

      .menu-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
      }

      .menu-card {
        cursor: pointer;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
      }

      .menu-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 25px 50px rgba(70, 40, 20, 0.18);
      }

      .menu-card app-card {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
    `,
  ],
})
export class ProductsComponent {
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  private router = inject(Router);

  menuUrl = 'https://my-json-server.typicode.com/zoelounge/menupizza/cards';

  pizzas = signal<Pizza[]>([]);

  constructor() {
    this.loadMenu();
  }

  loadMenu() {
    this.http
      .get<Pizza[]>(this.menuUrl)
      .subscribe((result) => this.pizzas.set(result));
  }

  getVisiblePizzas(): Pizza[] {
    const removed = this.cartService.removedFromMenu();
    return this.pizzas().filter((p) => !removed.includes(p.id));
  }

  goToDetails(menu: Menu) {
    this.router.navigate(['/menu', menu.id]);
  }
}
