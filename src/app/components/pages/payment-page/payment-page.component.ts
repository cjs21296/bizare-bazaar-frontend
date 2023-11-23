import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemListComponent } from '../../partials/order-item-list/order-item-list.component';
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-payment-page',
    standalone: true,
    templateUrl: './payment-page.component.html',
    styleUrl: './payment-page.component.css',
    imports: [CommonModule,
        TitleComponent,
        TextInputComponent,
        ReactiveFormsModule,
        OrderItemListComponent,
        DefaultButtonComponent]
})
export class PaymentPageComponent {
order:Order = new Order();
paymentForm!:FormGroup
isSubmitted=false;
constructor(private orderService:OrderService,
  private router:Router,
  private formBuilder:FormBuilder,
  private cartService:CartService){
  this.orderService.newOrderForCurrentUser().subscribe({
      next: (order)=>{
        this.order=order;
      },
      error:()=>{
        router.navigateByUrl('/checkout');
      }
    })

    this.paymentForm=formBuilder.group({
      cardNumber:['',[Validators.required,Validators.minLength(12),Validators.pattern('^[0-9]*$')]],
      month:['',Validators.required],
      year:['',Validators.required],
      cvv:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
    });
  }

  get fc(){
    return this.paymentForm.controls;
  }

  submit(){
    this.isSubmitted=true;
    if(this.paymentForm.invalid) return;

      this.orderService.pay(this.order).subscribe({
        next:(order)=>{
          // alert("payment successful: "+order.id)
          this.cartService.clearCart();
          this.router.navigateByUrl('/track/'+order.id);
        },
        error:(error)=>{
          alert("payment failed")
          // console.log(error)
          this.router.navigateByUrl('/checkout')
        }
      })

    }
}
