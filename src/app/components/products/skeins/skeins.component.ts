import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ProductService } from '../../../services/products.service';


@Component({
  selector: 'app-skeins',
  templateUrl: './skeins.component.html',
  styleUrls: ['./skeins.component.scss']
})
export class SkeinsComponent implements OnInit {
  products$;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.products$ = this.productService
      .getProducts()
      .pipe(catchError(error => error));
  }

  goToProduct(skein) {
    this.router.navigate(['/skein', JSON.stringify(skein)]);
  }

}
