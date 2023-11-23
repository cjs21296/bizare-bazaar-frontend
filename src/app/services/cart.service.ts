import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { storeItem } from '../shared/models/storeItem';
import { CartItem } from '../shared/models/CartItem';
import { BehaviorSubject, Observable } from 'rxjs'
import { StoreItemService } from './store-item.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  addToCart(inStoreitem:storeItem,inQuantity:number):void{
    const cartItem = <CartItem>this.cart.items.find(search=>search.item.id===inStoreitem.id);

    if(cartItem){
      this.changeQuantity(inStoreitem.id, cartItem.quantity+inQuantity);
    }
    else{
      console.log('addItem: '+cartItem)
      this.cart.items.push(new CartItem(inStoreitem,inQuantity));
      this.setTotals();
    }
    this.setCartToLocalStorage();    
  }

  removeFromCart(storeItemId:number):void{
    this.cart.items = this.cart.items.filter(item=>item.item.id!=storeItemId);
    this.setCartToLocalStorage();
  }

  changeQuantity(storeItemId:number, quantity:number){
    let cartItem = <CartItem>this.cart.items
      .find(item=>item.item.id === storeItemId);
    if(!cartItem)
      return;
    cartItem.quantity = quantity;
    cartItem.price = (quantity * cartItem.item.price);
    console.log(cartItem.price,cartItem.quantity,this.cart.totalPrice);
    this.setCartToLocalStorage();
  }

  getCart():Cart{
    return this.cartSubject.value;
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  setTotals(){
    this.cart.totalCount = this.cart.items
    .reduce((sum, currentitem) => sum + currentitem.quantity,0);
  this.cart.totalPrice = this.cart.items
    .reduce((sum, currentitem) => sum + currentitem.price,0);
  }

  private setCartToLocalStorage():void{
    this.setTotals();
        
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage() : Cart{
    const cartJson = localStorage.getItem('Cart');
    console.log(cartJson ? JSON.parse(cartJson): new Cart())
    return cartJson ? JSON.parse(cartJson): new Cart()
  }
}
