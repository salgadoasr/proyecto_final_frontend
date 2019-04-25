import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  cart = [];

  //CHARGE the shopping cart from localstorage at the beginning
  constructor(private authService: AuthService) {
    if (localStorage.getItem(`${this.authService.user.user_uuid}`)) {
      this.cart = JSON.parse(localStorage.getItem(`${this.authService.user.user_uuid}`));
    }
  }

  //ADD skeins to shopping cart
  addSkeinToCart(skein, color, quantity) {
    let actualItem;
    let position;

    //SEARCH the skein in the cart and the array element and the position are collected
    for (let i = 0; i < this.cart.length; i++) {
      if (skein.skein_uuid === this.cart[i].skein.skein_uuid && color.color_id === this.cart[i].color.color_id) {
        actualItem = this.cart[i];
        position = i;
      }
    }

    //ADD to cart or UPDATE de cart position
    if (!actualItem) {
      this.cart.push({
        skein,
        color,
        quantity
      });
    } else {
      actualItem.quantity = actualItem.quantity + quantity;
      this.cart[position] = actualItem;
    }
    //UPDATE the localstorage with the new cart
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }

  //DELETE a skein from shopping cart
  deleteSkeinFromCart(skein, color) {
    let actualItem;
    let position;

    for (let i = 0; i < this.cart.length; i++) {
      if (skein.skein_uuid === this.cart[i].skein.skein_uuid && color.color_id === this.cart[i].color.color_id) {
        actualItem = this.cart[i];
        position = i;
      }
    }
    delete this.cart[position];
    this.cart.splice(position, 1);

    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }

  //REMOVE 1 unit of a skein from shopping cart
  removeSkeinUnit(skein, color, quantity) {
    let actualItem;
    let position;

    for (let i = 0; i < this.cart.length; i++) {
      if (skein.skein_uuid === this.cart[i].skein.skein_uuid && color.color_id === this.cart[i].color.color_id) {
        actualItem = this.cart[i];
        position = i;
      }
    }
    actualItem.quantity = actualItem.quantity - quantity;
    this.cart[position] = actualItem;

    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }

}