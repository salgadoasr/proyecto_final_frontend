import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  totalQuantity;
  cart = [];

  //CHARGE the shopping cart from localstorage at the beginning
  constructor(private authService: AuthService) {
    if (this.authService.user) {
      if (localStorage.getItem(`${this.authService.user.user_uuid}`)) {
        this.cart = JSON.parse(localStorage.getItem(`${this.authService.user.user_uuid}`));
      }
    }
    this.calcTotalItems();
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


  //ADD skeins to shopping cart
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
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }

  //ADD kits to shopping cart
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
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }


  //DELETE a product from shopping cart
  addToCart(product) {
    if (product.color) {
      this.addUnitSkein(product);
    } else {
      this.addUnitKit(product);
    }
  }


  //ADD 1 unit of skein to shopping cart
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
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }


  //ADD 1 unit of kit to shopping cart
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
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }



  //DELETE a product from shopping cart
  deleteFromCart(product) {
    if (product.color) {
      this.deleteSkeinFromCart(product);
    } else {
      this.deleteKitFromCart(product);
    }
  }



  //DELETE a skein from shopping cart
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
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }



  //DELETE a kit from shopping cart
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
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }


  //REMOVE a unit of a product from shopping cart
  removeUnitFromCart(product) {
    if (product.color) {
      this.removeSkeinUnit(product);
    } else {
      this.removeKitUnit(product);
    }
  }


  //REMOVE 1 unit of a skein from shopping cart
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
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }


  //REMOVE 1 unit of a kit from shopping cart
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
    localStorage.setItem(`${this.authService.user.user_uuid}`, JSON.stringify(this.cart));
  }

}