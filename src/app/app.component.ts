import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { ShoppingCartService } from './services/shoppingcart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kits4kniters';

  constructor(public authService: AuthService, public shoppingCartService: ShoppingCartService) { }

}
