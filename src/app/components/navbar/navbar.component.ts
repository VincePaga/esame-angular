import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="navbar navbar-expand-lg main-navbar">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2" routerLink="/home">
          <img
            class="image"
            width="56"
            height="56"
            src="assets/logo_pizzeria.png"
            alt="Logo Pizzeria"
          />
          <span class="brand-text">Pizzeria Angular</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto gap-lg-2">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home" routerLinkActive="active">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/menu" routerLinkActive="active">
                Menu
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/cart" routerLinkActive="active">
                Carrello
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .image {
        border-radius: 40px;
      }

      .main-navbar {
        background: #fffaf6;
        border-bottom: 1px solid var(--border);
        box-shadow: 0 8px 18px rgba(70, 40, 20, 0.08);
      }

      .brand-text {
        font-family: 'Playfair Display', serif;
        font-weight: 700;
        color: var(--primary);
      }

      .nav-link {
        color: var(--text);
        font-weight: 600;
        border-radius: 999px;
        padding: 6px 14px;
        transition: background 0.2s ease, color 0.2s ease;
      }

      .nav-link.active,
      .nav-link:hover {
        color: #fff;
        background: var(--primary);
      }

      .navbar-toggler {
        border-color: var(--border);
      }

      .navbar-toggler-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(179,38,30,0.9)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
      }
    `,
  ],
})
export class NavbarComponent {}
