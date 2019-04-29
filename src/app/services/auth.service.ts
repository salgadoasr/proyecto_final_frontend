import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = null;
  token = null;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('auth')) {
      this.token = localStorage.getItem('auth');
      this.user = JSON.parse(this.token).user;
    }
  }

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

  update({ name, surnames, direction }) {
    return this.http.post(`${environment.apiBaseUrl}/account/update`, {
      name,
      surnames,
      direction
    });
  }

  isAuthenticated() {
    if (this.user === null) return false;
    return true;
  }

  isAdmin() {
    if (this.isAuthenticated()) {
      if (this.user.is_admin === 1) return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('auth');
    this.token = null;
    this.user = null;
    this.router.navigate(['/welcome']);
  }

}