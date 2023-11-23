import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItem';
import { TitleComponent } from "../../partials/title/title.component";
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";

@Component({
    selector: 'app-cart-page',
    standalone: true,
    templateUrl: './cart-page.component.html',
    styleUrl: './cart-page.component.css',
    imports: [CommonModule, TitleComponent, RouterModule, NotFoundComponent]
})
export class CartPageComponent {
  cart!:Cart;
  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart = cart;
    });
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.item.id);
  }

  setQuantity(cartItem:CartItem,quantity:string){
    this.cartService.changeQuantity(cartItem.item.id, parseInt(quantity));
  }

  clearCart(){
    this.cartService.clearCart();
  }
}
