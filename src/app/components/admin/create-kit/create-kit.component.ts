import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-create-kit',
  templateUrl: './create-kit.component.html',
  styleUrls: ['./create-kit.component.scss']
})
export class CreateKitComponent implements OnInit {
  products$;
  created = false;

  createKitForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      details: ['', [Validators.required]],
      file: ['', [Validators.required]],
      skein: ['', [Validators.required]],
      season: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.products$ = this.adminService
      .getSkeins()
      .pipe(catchError(error => error));
  }

  create(imageInput) {
    const file = imageInput.files[0];
    if (this.createKitForm.valid) {
      this.adminService
        .createKit(this.createKitForm.value, file)
        .subscribe(() => {
          this.createKitForm.reset();
          this.created = true;
        }, error => console.log(error));
    }
  }

}
