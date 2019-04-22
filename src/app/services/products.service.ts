import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) { }

  getSkeins() {
    return this.http.get(`${environment.apiBaseUrl}/user/skeins`);
  }

  getSkeinColors(skein_uuid) {
    return this.http.get(`${environment.apiBaseUrl}/user/skeincolors`, {
      params: {
        skein_uuid: skein_uuid
      }
    });
  }

  getSkein(id: string) {
    return this.http.get(`${environment.apiBaseUrl}/user/skeins/${id}`);
  }
}