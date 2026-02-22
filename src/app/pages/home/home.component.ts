import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero d-flex align-items-center">
      <div class="container text-center text-lg-start">
        <div class="row align-items-center g-4">
          <div class="col-12 col-lg-6">
            <h1 class="display-3 mb-3 hero-title">
              Benvenuti alla <span class="highlight">Pizzeria Angular</span>
            </h1>
            <p class="lead hero-subtitle">
              Tradizione italiana, ingredienti freschi e impasti leggeri.<br />
              Scopri la nostra selezione di pizze artigianali.
            </p>
            <a
              routerLink="/menu"
              class="button btn btn-main btn-lg mt-3 hero-btn"
            >
              Scopri il Menu
            </a>
          </div>
          <div class="col-12 col-lg-6 text-center">
            <img
              src="assets/pizzeria_banner.png"
              alt="Pizzeria Angular"
              class="hero-img img-fluid"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="features py-5">
      <div class="container">
        <div class="row g-4 text-center">
          <div class="col-12 col-md-4" *ngFor="let card of featureCards()">
            <div class="feature-card h-100 p-4">
              <h3 class="mb-2">{{ card.title }}</h3>
              <p>{{ card.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        min-height: 80vh;
        background: linear-gradient(135deg, #ffe5d6, #fffaf5);
        padding: 60px 0;
      }

      .hero-title {
        font-weight: 800;
        line-height: 1.2;
        color: #b71c1c;
      }

      .highlight {
        color: #ff7043;
      }

      .hero-subtitle {
        font-size: 1.25rem;
        color: #5a3e1b;
        line-height: 1.5;
      }

      .hero-btn {
        padding: 12px 30px;
        font-weight: 600;
        border-radius: 50px;
        color: #f7b792;
        box-shadow: 0 8px 20px rgba(70, 40, 20, 0.15);
        transition:
          transform 0.2s,
          box-shadow 0.2s;
      }

      .hero-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 28px rgba(70, 40, 20, 0.25);
      }

      .hero-img {
        border-radius: 24px;
        max-width: 100%;
        box-shadow: 0 20px 40px rgba(70, 40, 20, 0.25);
        transition: transform 0.3s ease;
      }

      .hero-img:hover {
        transform: scale(1.03);
      }

      .features {
        background: #fff8f0;
      }

      .feature-card {
        background: #fff;
        border-radius: 20px;
        box-shadow: 0 12px 24px rgba(70, 40, 20, 0.1);
        transition:
          transform 0.3s,
          box-shadow 0.3s;
      }

      .feature-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 32px rgba(70, 40, 20, 0.2);
      }

      .feature-card .icon {
        font-size: 2.5rem;
        color: #ff7043;
      }

      .feature-card h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: #8b0000;
      }

      .feature-card p {
        color: #5a3e1b;
        font-size: 0.95rem;
        line-height: 1.5;
      }
    `,
  ],
})
export class HomeComponent {
  featureCards = signal([
    {
      title: 'Impasto leggero',
      desc: 'Lievitazione lenta e farina selezionata per una pizza digeribile.',
    },
    {
      title: 'Ingredienti freschi',
      desc: 'Solo prodotti di stagione e fornitori locali per un gusto autentico.',
    },
    {
      title: 'Forno a legna',
      desc: 'Cottura rapida e profumo unico, proprio come nella tradizione.',
    },
  ]);
}
