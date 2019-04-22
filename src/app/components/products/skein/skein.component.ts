import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';


import { ProductService } from '../../../services/products.service';

@Component({
  selector: 'app-skein',
  templateUrl: './skein.component.html',
  styleUrls: ['./skein.component.scss']
})
export class SkeinComponent implements OnInit {
  product$;
  colors$;
  imageUrl$;

  constructor(private productService: ProductService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.product$ = JSON.parse(this.router.snapshot.params.skein);
    this.colors$ = this.productService
      .getSkeinColors(this.product$.skein_uuid)
      .pipe(catchError(error => error));
    this.imageUrl$ = this.product$.image_url;
  }

  selectImageUrl(imageUrl) {
    this.imageUrl$ = imageUrl;
  }

}
