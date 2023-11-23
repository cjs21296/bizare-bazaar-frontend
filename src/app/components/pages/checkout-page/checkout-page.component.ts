import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../shared/models/Cart';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { TitleComponent } from "../../partials/title/title.component";
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { OrderItemListComponent } from '../../partials/order-item-list/order-item-list.component';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout-page',
    standalone: true,
    templateUrl: './checkout-page.component.html',
    styleUrl: './checkout-page.component.css',
    imports: [CommonModule, 
      TitleComponent, 
      FormsModule, 
      ReactiveFormsModule, 
      TextInputComponent,
      OrderItemListComponent]
})
export class CheckoutPageComponent {
  order:Order = new Order();
  checkoutForm!:FormGroup;
  isSubmitted:boolean=false;
  constructor(cartService:CartService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private orderService:OrderService,
    private router:Router){
      const cart = cartService.getCart();
      this.order.items = cart.items;
      this.order.totalPrice=cart.totalPrice;

      let {name,address} = this.userService.currentUser;
      this.checkoutForm = this.formBuilder.group({
        name:[name,Validators.required],
        address:[address,Validators.required]
      })
    }

    get fc(){
      return this.checkoutForm.controls;
    }

    createOrder(){
      this.isSubmitted=true;
      if(this.checkoutForm.invalid){
        return;
      }

      this.order.name = this.fc.name.value;
      this.order.address = this.fc.address.value;

      this.orderService.create(this.order).subscribe({
        next:()=>{
          this.router.navigateByUrl('/payment')
        },
        error:(error)=>{
          console.log(error, 'Cart');
        }
      })
    }
}
