import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  login() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .subscribe(data => {
          this.authService.token = JSON.stringify(data);
          localStorage.setItem('auth', JSON.stringify(data));
        }, error => console.log(error), () => {
          this.authService.user = JSON.parse(this.authService.token).user;
          this.router.navigate(['/welcome']);
        });
    }
  }
}
