import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { SingleProductComponent } from './pages/products/single-product.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: ProductsComponent },
  { path: 'pizze/:id', component: SingleProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'menu/:id', redirectTo: 'pizze/:id', pathMatch: 'full' },
];
