import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SkeinsComponent } from './components/products/skeins/skeins.component';
import { SkeinComponent } from './components/products/skein/skein.component';
import { KitsComponent } from './components/products/kits/kits.component';
import { KitComponent } from './components/products/kit/kit.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { CartComponent } from './components/shopping/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'skeins',
    component: SkeinsComponent
  },
  {
    path: 'skein/:skein',
    component: SkeinComponent
  },
  {
    path: 'kits',
    component: KitsComponent
  },
  {
    path: 'kit/:kit',
    component: KitComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
