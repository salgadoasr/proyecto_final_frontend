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
  created = false;

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
        .subscribe(() => {
          const { name, surnames, direction } = this.profileForm.value;
          this.authService.user.name = name;
          this.authService.user.surnames = surnames;
          this.authService.user.direction = direction;
          this.created = true;
        }, error => console.log(error));
    }
  }

}
