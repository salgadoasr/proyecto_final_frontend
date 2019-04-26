import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';


import { ProductService } from '../../../services/products.service';
import { ShoppingCartService } from '../../../services/shoppingcart.service';

@Component({
  selector: 'app-skein',
  templateUrl: './skein.component.html',
  styleUrls: ['./skein.component.scss']
})
export class SkeinComponent implements OnInit {
  product$;
  colors$;
  imageUrl$;
  quantity;
  color;

  constructor(private productService: ProductService, private router: ActivatedRoute, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.product$ = JSON.parse(this.router.snapshot.params.skein);
    this.colors$ = this.productService
      .getSkeinColors(this.product$.skein_uuid)
      .pipe(catchError(error => error));
    this.imageUrl$ = this.product$.image_url;
    this.quantity = 1;
    //lo hago porque no consigo acceder al objeto color del producto cuando carga el módulo pero sirve igual porque tiene los campos que necesito
    this.color = this.product$;
  }

  actualColor(color) {
    this.color = color;
  }

  selectImageUrl(imageUrl) {
    this.imageUrl$ = imageUrl;
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
