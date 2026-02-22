import { Injectable, signal } from '@angular/core';
import { Pizza } from '../components/card/card.component';

export interface CartItem extends Pizza {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartItem[]>([]);
  removedFromMenu = signal<number[]>([]);

  addPizza(pizza: Pizza) {
    this.cart.update((items) => {
      const index = items.findIndex((item) => item.id === pizza.id);
      if (index === -1) return [...items, { ...pizza, quantity: 1 }];

      const updated = [...items];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + 1,
      };
      return updated;
    });
  }

  removePizza(pizza: Pizza) {
    this.cart.update((items) => {
      const index = items.findIndex((item) => item.id === pizza.id);
      if (index === -1) return items;

      const updated = [...items];
      if (updated[index].quantity <= 1) {
        updated.splice(index, 1);
      } else {
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity - 1,
        };
      }
      return updated;
    });
  }

  quantityFor(pizzaId: number): number {
    return this.cart().find((item) => item.id === pizzaId)?.quantity ?? 0;
  }

  clearCart() {
    this.cart.set([]);
  }

  removeFromMenu(pizzaId: number) {
    this.removedFromMenu.update((ids) => {
      if (ids.includes(pizzaId)) {
        return ids;
      }
      return [...ids, pizzaId];
    });
    this.removeAllFromCart(pizzaId);
  }

  restoreMenu() {
    this.removedFromMenu.set([]);
  }

  removeAllFromCart(pizzaId: number) {
    this.cart.update((items) => items.filter((item) => item.id !== pizzaId));
  }
}
