import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-create-color',
  templateUrl: './create-color.component.html',
  styleUrls: ['./create-color.component.scss']
})
export class CreateColorComponent implements OnInit {
  products$;
  created = false;

  createColorForm = this.fb.group(
    {
      color: ['', [Validators.required]],
      file: ['', [Validators.required]],
      skein: ['', [Validators.required]]
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
    if (this.createColorForm.valid) {
      this.adminService
        .createColor(this.createColorForm.value, file)
        .subscribe(() => {
          this.createColorForm.reset();
          this.created = true;
        }, error => console.log(error));
    }
    }
  

}
