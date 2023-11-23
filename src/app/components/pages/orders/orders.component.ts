import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router, RouterModule } from '@angular/router';
import { OrderTrackPageComponent } from "../order-track-page/order-track-page.component";

@Component({
    selector: 'app-orders',
    standalone: true,
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css',
    imports: [CommonModule, OrderTrackPageComponent, RouterModule]
})
export class OrdersComponent {
orders!:Order[]

  constructor(private orderService:OrderService, private router:Router){
    this.orderService.getAllUserOrders().subscribe(orders=>{
      this.orders=orders;
    })
  }
  goToOrder(){
    this.router.navigateByUrl('track')
  }
}
