import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { ProductService } from '../../../services/products.service';
import { ShoppingCartService } from '../../../services/shoppingcart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-kit',
  templateUrl: './kit.component.html',
  styleUrls: ['./kit.component.scss']
})
export class KitComponent implements OnInit {
  product$;
  sizes$;
  sizePrizes;
  quantity;
  size;

  constructor(private productService: ProductService, private router: ActivatedRoute, private shoppingCartService: ShoppingCartService, private authService: AuthService) { }

  ngOnInit() {
    this.product$ = JSON.parse(this.router.snapshot.params.kit);
    this.sizes$ = this.productService
      .getKitSizes(this.product$.kit_uuid)
      .pipe(catchError(error => error));
    this.sizePrizes = this.product$.prize;
    this.quantity = 1;
    //lo hago porque no consigo acceder al objeto color del producto cuando carga el módulo pero sirve igual porque tiene los campos que necesito
    this.size = this.product$;
  }

  actualSize(size) {
    this.size = size;
  }

  selectPrize(prize) {
    this.sizePrizes = prize;
  }

  removeUnit() {
    if (this.quantity > 1)
      --this.quantity;
  }

  addUnit() {
    if (this.quantity < 50)
      ++this.quantity;
  }

}
