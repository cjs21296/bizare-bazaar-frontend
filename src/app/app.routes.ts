import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ItemComponent } from './components/pages/item/item.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { registerLocaleData } from '@angular/common';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { OrdersComponent } from './components/pages/orders/orders.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'item/:id', component: ItemComponent},
    {path: 'search/:searchTerm', component:HomeComponent},
    {path: 'cart-page', component: CartPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'checkout', component: CheckoutPageComponent, canActivate:[authGuard]},
    {path: 'payment', component: PaymentPageComponent, canActivate:[authGuard]},
    {path: 'track/:orderId', component: OrderTrackPageComponent, canActivate:[authGuard]},
    {path: 'orders', component: OrdersComponent, canActivate:[authGuard]},
];
