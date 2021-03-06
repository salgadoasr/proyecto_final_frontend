import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  products$;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.products$ = this.productService
      .getSkeins()
      .pipe(catchError(error => error));
  }

  goToSkein(skein) {
    this.router.navigate(['/skein', JSON.stringify(skein)]);
  }


}
