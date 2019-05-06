import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.orders$ = this.ordersService
      .getOrders()
      .pipe(catchError(error => error));
  }

  isPaid(order_uuid) {
    this.ordersService
      .updateOrder(order_uuid)
      .subscribe(() => window.location.reload(), error => console.log(error));
  }

}
