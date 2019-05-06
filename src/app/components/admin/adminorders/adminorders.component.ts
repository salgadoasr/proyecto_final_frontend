import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders$;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.orders$ = this.adminService
      .getOrders()
      .pipe(catchError(error => error));
  }

}
