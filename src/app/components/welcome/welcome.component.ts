import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  products$;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService
      .getProducts()
      .pipe(catchError(error => error));
  }

}
