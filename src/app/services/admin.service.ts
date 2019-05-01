import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private http: HttpClient) { }

  createSkein({ name, description, composition, weight, large, season, prize }) {
    return this.http.post(`${environment.apiBaseUrl}/admin/createskein`, {
      name,
      description,
      composition,
      weight,
      large,
      season,
      prize
    });
  }

  createSize({ size, kit: kit_uuid, prize, num_skeins }) {
    return this.http.post(`${environment.apiBaseUrl}/admin/createsize`, {
      size,
      kit_uuid,
      prize,
      num_skeins
    });
  }

  createColor({ color, skein: uuid }, image) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('color', color);
    formData.append('uuid', uuid);
    return this.http.post(`${environment.apiBaseUrl}/admin/createcolor`, formData);
  }

  createKit({ name, details, season, skein: uuid }, image) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('name', name);
    formData.append('details', details);
    formData.append('uuid', uuid);
    formData.append('season', season);
    return this.http.post(`${environment.apiBaseUrl}/admin/createkit`, formData);
  }

  deleteSkein(skein_uuid) {
    return this.http.delete(`${environment.apiBaseUrl}/admin/deleteskein`, {
      params: {
        skein_uuid: skein_uuid
      }
    });
  }

  deleteKit(kit_uuid) {
    return this.http.delete(`${environment.apiBaseUrl}/admin/deletekit`, {
      params: {
        kit_uuid: kit_uuid
      }
    });
  }

  getSkeins() {
    return this.http.get(`${environment.apiBaseUrl}/admin/skeins`);
  }

  getKits() {
    return this.http.get(`${environment.apiBaseUrl}/admin/kits`);
  }

}