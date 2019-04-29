import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-create-size',
  templateUrl: './create-size.component.html',
  styleUrls: ['./create-size.component.scss']
})
export class CreateSizeComponent implements OnInit {
  products$;

  createSizeForm = this.fb.group(
    {
      size: ['', [Validators.required]],
      prize: ['', [Validators.required]],
      kit: ['', [Validators.required]],
      skeins: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.products$ = this.adminService
      .getKits()
      .pipe(catchError(error => error));
  }

  create() {
    if (this.createSizeForm.valid) {
      this.adminService
        .createSize(this.createSizeForm.value)
        .subscribe(() => this.router.navigate(['/kits']), error => console.log(error));
    }
  }

}
