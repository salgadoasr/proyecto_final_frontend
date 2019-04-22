import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login({ email, password }) {
    return this.http.post(`${environment.apiBaseUrl}/account/login`, {
      email,
      password
    });
  }

  register({ name, surnames, email, password, direction }) {
    return this.http.post(`${environment.apiBaseUrl}/account`, {
      name,
      surnames,
      email,
      password,
      direction
    });
  }
}