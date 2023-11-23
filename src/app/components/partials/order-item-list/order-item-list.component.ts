import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../shared/models/Order';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'order-item-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './order-item-list.component.html',
  styleUrl: './order-item-list.component.css'
})
export class OrderItemListComponent {
@Input()
  order!:Order;
}
