import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ProductService } from '../../../services/products.service';


@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.scss']
})
export class KitsComponent implements OnInit {
  products$;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.products$ = this.productService
      .getKits()
      .pipe(catchError(error => error));
  }

  goToKit(kit) {
    this.router.navigate(['/kit', JSON.stringify(kit)]);
  }
}
