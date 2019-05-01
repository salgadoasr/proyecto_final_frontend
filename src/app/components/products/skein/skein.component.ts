import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';


import { ProductService } from '../../../services/products.service';
import { ShoppingCartService } from '../../../services/shoppingcart.service';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-skein',
  templateUrl: './skein.component.html',
  styleUrls: ['./skein.component.scss']
})
export class SkeinComponent implements OnInit {
  product$;
  image;
  color;
  quantity;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public shoppingCartService:
      ShoppingCartService,
    public authService: AuthService,
    private adminService: AdminService
  ) { }


  ngOnInit() {
    this.product$ = this.productService
      .getSkein(this.route.snapshot.params.skein)
      .pipe(tap(data => {
        this.color = data;
        this.image = data["image_url"];
      }), catchError(error => error));
    this.quantity = 1;
  }

  delete(skein_uuid) {
    this.adminService
      .deleteSkein(skein_uuid)
      .subscribe(() => this.router.navigate(['/skeins']), error => console.log(error));
  }

  actualColor(color) {
    this.color = color;
  }

  selectImage(image) {
    this.image = image;
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
