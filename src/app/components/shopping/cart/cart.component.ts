import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from '../../../services/shoppingcart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

}
