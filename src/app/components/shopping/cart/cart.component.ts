import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../../../services/shoppingcart.service';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart = this.shoppingCartService.cart;

  constructor(public shoppingCartService: ShoppingCartService, private ordersService: OrdersService, private router: Router) { }

  ngOnInit() {
  }

  //process a order with the products of the shopping cart
  processOrder() {
    let products = [];
    let totalPrize, color, skeinUuid, skein, size, kitUuid, kit, quantity, imageUrl, name;

    for (let i = 0; i < this.cart.length; i++) {
      totalPrize = this.shoppingCartService.totalPrize;
      quantity = this.cart[i].quantity;
      name = this.cart[i].product.name;

      if (this.cart[i].color) {
        color = this.cart[i].color.color;
        skeinUuid = this.cart[i].product.skein_uuid;
        imageUrl = this.cart[i].color.image_url;
        skein = { totalPrize, color, skeinUuid, quantity, imageUrl, name };

        products.push(skein);
      } else {
        size = this.cart[i].size.size;
        kitUuid = this.cart[i].product.kit_uuid;
        imageUrl = this.cart[i].product.image_url;
        kit = { totalPrize, size, kitUuid, quantity, imageUrl, name };

        products.push(kit);
      }
    }
    this.ordersService.createOrder(products).subscribe(
      () => this.router.navigate(['/orders']),
      error => console.log(error)
    );
  }



}
