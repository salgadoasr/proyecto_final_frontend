import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private http: HttpClient) { }

  createSkein({ name, description, composition, weight, large, type_id, prize }) {
    return this.http.post(`${environment.apiBaseUrl}/admin/skein`, {
      name,
      description,
      composition,
      weight,
      large,
      type_id,
      prize
    });
  }

  createSize({ size, kit: kit_uuid, prize, skeins }) {
    return this.http.post(`${environment.apiBaseUrl}/admin/createsize`, {
      size,
      kit_uuid,
      prize,
      skeins
    });
  }

  createColor({ color, skein: uuid }, image) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('color', color);
    formData.append('uuid', uuid);
    return this.http.post(`${environment.apiBaseUrl}/admin/createcolor`, formData);
  }

  createKit({ name, details, type_id, skein: uuid }, image) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('name', name);
    formData.append('details', details);
    formData.append('uuid', uuid);
    formData.append('type_id', type_id);
    return this.http.post(`${environment.apiBaseUrl}/admin/createkit`, formData);
  }

  getSkeins() {
    return this.http.get(`${environment.apiBaseUrl}/admin/skeins`);
  }

  getKits() {
    return this.http.get(`${environment.apiBaseUrl}/admin/kits`);
  }

}