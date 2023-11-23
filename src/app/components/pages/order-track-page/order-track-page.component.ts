import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderItemListComponent } from "../../partials/order-item-list/order-item-list.component";

@Component({
    selector: 'app-order-track-page',
    standalone: true,
    templateUrl: './order-track-page.component.html',
    styleUrl: './order-track-page.component.css',
    imports: [CommonModule, OrderItemListComponent]
})
export class OrderTrackPageComponent {
@Input()
order!:Order;
constructor(private activatedRoute:ActivatedRoute,
  private orderService:OrderService){
    if(!this.order){
      const params = this.activatedRoute.snapshot.params;
    if(!params.orderId)
      return;
    this.orderService.trackOrderByID(params.orderId).subscribe(order=>{
      this.order=order;
    })
    }
  }
}
