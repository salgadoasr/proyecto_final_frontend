import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

import { ProductService } from '../../../services/products.service';
import { ShoppingCartService } from '../../../services/shoppingcart.service';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-kit',
  templateUrl: './kit.component.html',
  styleUrls: ['./kit.component.scss']
})
export class KitComponent implements OnInit {
  product$;
  prize;
  numSkeins;
  size;
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
      .getKit(this.route.snapshot.params.kit)
      .pipe(tap(data => {
        this.numSkeins = data["num_skeins"];
        this.prize = data["prize"];
        this.size = data;
      }), catchError(error => error));
    this.quantity = 1;
  }

  delete(kit_uuid) {
    this.adminService
      .deleteKit(kit_uuid)
      .subscribe(() => this.router.navigate(['/skeins']), error => console.log(error));
  }

  actualSize(size) {
    this.size = size;
  }

  selectPrize(prize) {
    this.prize = prize;
  }

  selectSkeins(numSkeins) {
    this.numSkeins = numSkeins;
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
