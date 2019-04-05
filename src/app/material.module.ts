import { NgModule } from '@angular/core';

import {
  MatButtonModule
} from '@angular/material';

import {
  MatMenuModule
} from '@angular/material/menu';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatCardModule
} from '@angular/material/card';

import {
  MatGridListModule
} from '@angular/material/grid-list';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
})
export class MaterialModule { }
