import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-create-skein',
  templateUrl: './create-skein.component.html',
  styleUrls: ['./create-skein.component.scss']
})
export class CreateSkeinComponent implements OnInit {
  created = false;

  createSkeinForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      composition: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      large: ['', [Validators.required]],
      season: ['', [Validators.required]],
      prize: ['', [Validators.pattern("^[0-9]*$"), Validators.required]],
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    if (this.createSkeinForm.valid) {
      this.adminService
        .createSkein(this.createSkeinForm.value)
        .subscribe(() => {
          this.createSkeinForm.reset();
          this.created = true;
        }, error => console.log(error));
    }
  }

}
