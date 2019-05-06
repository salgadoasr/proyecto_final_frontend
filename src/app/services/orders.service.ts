import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  constructor(private http: HttpClient) { }

  createOrder(products) {
    return this.http.post(`${environment.apiBaseUrl}/user/createorder`, {
      products
    });
  }

  getOrders() {
    return this.http.get(`${environment.apiBaseUrl}/user/orders`);
  }

  updateOrder(orderUuid) {
    console.log(orderUuid);
    return this.http.put(`${environment.apiBaseUrl}/user/payorder`, {
      orderUuid
    });
  }

}