import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  totalQuantity;
  totalPrize;
  cart = [];


  //CHARGE the shopping cart from localstorage at the beginning
  constructor(private authService: AuthService, private http: HttpClient) {
    if (this.authService.user) {
      if (localStorage.getItem(`${this.authService.user.user_uuid}`)) {
        this.cart = JSON.parse(localStorage.getItem(`${this.authService.user.user_uuid}`));
      }
    }
    this.calcTotalItems();
    this.calcTotalPrize();
  }


  //CALCULATE the total item from the shopping cart for show in the cart icon
  calcTotalItems() {
    if (this.cart.length != 0) {
      this.totalQuantity = 0;
    } else {
      this.totalQuantity = undefined;
    }
    for (let i = 0; i < this.cart.length; i++) {
      this.totalQuantity = parseInt(this.totalQuantity) + parseInt(this.cart[i].quantity);
    }
  }

  // CALCULATE the total prize of the order
  calcTotalPrize() {
    let productTotal;
    this.totalPrize = 0;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].color) {
        productTotal = this.cart[i].quantity * parseFloat(this.cart[i].product.prize);
      } else {
        productTotal = this.cart[i].quantity * parseFloat(this.cart[i].size.prize);
      }
      this.totalPrize = this.totalPrize + parseFloat(productTotal);
      this.totalPrize = Math.round(this.totalPrize * 100) / 100;
    }
  }


  //ADD skeins to shopping cart and create a instance of the product in the shopping cart memory
  addSkeinToCart(product, color, quantity) {
    let actualItem;
    let position;

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].color) {
        if (product.product_uuid === this.cart[i].product.product_uuid && color.color_id === this.cart[i].color.color_id) {
          actualItem = this.cart[i];
          position = i;
        }
      }
    }
    if (!actualItem) {
      this.cart.push({
        product,
        color,
        quantity
      });
    } else {
      actualItem.quantity = actualItem.quantity + quantity;
      this.cart[position] = actualItem;
    }
    this.calcTotalItems();
    this.calcTotalPrize();
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }


  //ADD kits to shopping cart and create a instance of the product in the shopping cart memory
  addKitToCart(product, size, quantity) {
    let actualItem;
    let position;

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].size) {
        if (product.product_uuid === this.cart[i].product.product_uuid && size.size_id === this.cart[i].size.size_id) {
          actualItem = this.cart[i];
          position = i;
        }
      }
    }
    if (!actualItem) {
      this.cart.push({
        product,
        size,
        quantity
      });
    } else {
      actualItem.quantity = actualItem.quantity + quantity;
      this.cart[position] = actualItem;
    }
    this.calcTotalItems();
    this.calcTotalPrize();
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }

  ///////////////////////////////////////////
  //ADD a unit of skein or kit to the shopping cart 
  ///////////////////////////////////////////

  addToCart(product) {
    if (product.color) {
      this.addUnitSkein(product);
    } else {
      this.addUnitKit(product);
    }
  }


  addUnitSkein(product) {
    let actualItem;
    let position;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].color) {
        if (product.product.product_uuid === this.cart[i].product.product_uuid && product.color.color_id === this.cart[i].color.color_id) {
          actualItem = this.cart[i];
          position = i;
        }
      }
    }
    actualItem.quantity = ++actualItem.quantity;
    this.cart[position] = actualItem;
    this.calcTotalItems();
    this.calcTotalPrize();
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }


  addUnitKit(product) {
    let actualItem;
    let position;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].size) {
        if (product.product.product_uuid === this.cart[i].product.product_uuid && product.size.size_id === this.cart[i].size.size_id) {
          actualItem = this.cart[i];
          position = i;
        }
      }
    }
    actualItem.quantity = ++actualItem.quantity;
    this.cart[position] = actualItem;
    this.calcTotalItems();
    this.calcTotalPrize();
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////

  /////////////////////////////////////////////////
  //DELETE a product from the shopping cart
  /////////////////////////////////////////////////

  deleteFromCart(product) {
    if (product.color) {
      this.deleteSkeinFromCart(product);
    } else {
      this.deleteKitFromCart(product);
    }
  }


  deleteSkeinFromCart(product) {
    let position;

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].color) {
        if (product.product.product_uuid === this.cart[i].product.product_uuid && product.color.color_id === this.cart[i].color.color_id) {
          position = i;
        }
      }
    }
    delete this.cart[position];
    this.cart.splice(position, 1);
    this.calcTotalItems();
    this.calcTotalPrize();
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }


  deleteKitFromCart(product) {
    let position;

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].size) {
        if (product.product.product_uuid === this.cart[i].product.product_uuid && product.size.size_id === this.cart[i].size.size_id) {
          position = i;
        }
      }
    }
    delete this.cart[position];
    this.cart.splice(position, 1);
    this.calcTotalItems();
    this.calcTotalPrize();
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }


  /////////////////////////////////////////////////
  /////////////////////////////////////////////////

  ////////////////////////////////////////////////////
  //REMOVE a unit of a skein or kit from shopping cart
  ////////////////////////////////////////////////////

  removeUnitFromCart(product) {
    if (product.color) {
      this.removeSkeinUnit(product);
    } else {
      this.removeKitUnit(product);
    }
  }


  removeSkeinUnit(product) {
    let position;
    let actualItem;

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].color) {
        if (product.product.product_uuid === this.cart[i].product.product_uuid && product.color.color_id === this.cart[i].color.color_id) {
          actualItem = this.cart[i];
          position = i;
        }
      }
    }
    actualItem.quantity = --actualItem.quantity;

    if (actualItem.quantity < 1) {
      delete this.cart[position];
      this.cart.splice(position, 1);
    } else {
      this.cart[position] = actualItem;
    }
    this.calcTotalItems();
    this.calcTotalPrize();
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }


  removeKitUnit(product) {
    let position;
    let actualItem;

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].size) {
        if (product.product.product_uuid === this.cart[i].product.product_uuid && product.size.size_id === this.cart[i].size.size_id) {
          actualItem = this.cart[i];
          position = i;
        }
      }
    }
    actualItem.quantity = --actualItem.quantity;

    if (actualItem.quantity < 1) {
      delete this.cart[position];
      this.cart.splice(position, 1);
    } else {
      this.cart[position] = actualItem;
    }
    this.calcTotalItems();
    this.calcTotalPrize();
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }

  //empty the cart when process a order
  emptyCart() {
    this.cart = [];
    localStorage.removeItem(`${this.authService.user.user_uuid}`);
    this.totalQuantity = undefined;
    this.totalPrize = 0;
  }

}