import { storeItem } from "./storeItem";

export class CartItem{

    constructor(public item:storeItem,public quantity:number){}
    price:number = this.item.price*this.quantity;
    // get price (){
    //     return this.item.price*this.quantity;
    // }
}