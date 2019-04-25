import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { ProductService } from '../../../services/products.service';

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

  constructor(private productService: ProductService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.product$ = JSON.parse(this.router.snapshot.params.kit);
    console.log(this.product$);
    this.sizes$ = this.productService
      .getKitSizes(this.product$.kit_uuid)
      .pipe(catchError(error => error));
    this.sizePrizes = this.product$.prize;
    this.quantity = 1;
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
