import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { SkeinsComponent } from './components/products/skeins/skeins.component';
import { SkeinComponent } from './components/products/skein/skein.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { KitsComponent } from './components/products/kits/kits.component';
import { KitComponent } from './components/products/kit/kit.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { CartComponent } from './components/shopping/cart/cart.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CreateSkeinComponent } from './components/admin/create-skein/create-skein.component';
import { CreateColorComponent } from './components/admin/create-color/create-color.component';
import { CreateKitComponent } from './components/admin/create-kit/create-kit.component';
import { CreateSizeComponent } from './components/admin/create-size/create-size.component';
import { OrdersComponent } from './components/shopping/orders/orders.component';
import { AdminOrdersComponent } from './components/admin/adminorders/adminorders.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SkeinsComponent,
    SkeinComponent,
    RegisterComponent,
    KitsComponent,
    KitComponent,
    ProfileComponent,
    CartComponent,
    CreateSkeinComponent,
    CreateColorComponent,
    CreateKitComponent,
    CreateSizeComponent,
    OrdersComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
