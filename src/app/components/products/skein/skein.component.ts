import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skein',
  templateUrl: './skein.component.html',
  styleUrls: ['./skein.component.scss']
})
export class SkeinComponent implements OnInit {
  product$;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.product$ = JSON.parse(this.router.snapshot.params.skein);
  }

}
