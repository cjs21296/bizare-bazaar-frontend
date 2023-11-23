import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { storeItem } from '../../../shared/models/storeItem';
import { StoreItemService } from '../../../services/store-item.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";


@Component({
    selector: 'app-item',
    standalone: true,
    templateUrl: './item.component.html',
    styleUrl: './item.component.css',
    imports: [CommonModule, FormsModule, NotFoundComponent]
})
export class ItemComponent {
  item!:storeItem;
  addNumber:number=1;
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private storeItemService:StoreItemService,
    private cartService:CartService
    ){
      
      activatedRoute.params.subscribe((params)=>{
        if(params['id'])
          storeItemService.getItemById(params['id']).subscribe(serverItem=>this.item=serverItem);
      })
    }

    addToCart(){
      this.cartService.addToCart(this.item,this.addNumber);
      this.router.navigateByUrl('/cart-page');
    }
}
