import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = this.fb.group(
    {
      name: [''],
      surnames: [''],
      direction: ['']
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.profileForm.setValue({
      name: this.authService.user.name,
      surnames: this.authService.user.surnames,
      direction: this.authService.user.direction
    })
  }

  update() {
    if (this.profileForm.valid) {
      this.authService
        .update(this.profileForm.value)
        .subscribe(() => this.router.navigate(['/welcome']), error => console.log(error));
    }
  }

}
