import { CartItem } from "./CartItem";

export class Cart{
    items:CartItem[]=[];

    totalPrice:number=0;
    totalCount:number=0;
    // get totalPrice(){
    //     return this.items
    // .reduce((sum, currentitem) => sum + currentitem.item.price,0);
    // }
}