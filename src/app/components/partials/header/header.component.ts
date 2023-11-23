import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
cartQuantity=0;
user!:User;
constructor(cartService:CartService,private userService:UserService){
  cartService.getCartObservable().subscribe(cart=>{
    this.cartQuantity=cart.totalCount;
  })
  userService.userObservable.subscribe(newUser=>{
    this.user = newUser;
  })
}
logout(){
  this.userService.logout();
}
testUser(){
  this.userService.userObservable.subscribe(user=>
    console.log("userService: "+user.token));
    console.log("pageUser: "+this.user.name);
    if(this.user.token)
    console.log("hasToken: exists")
}
}
