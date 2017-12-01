import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {HeaderComponent} from './components/header/header.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {FiltersComponent} from './components/filters/filters.component';
import {ProductComponent} from './components/product/product.component';
import {PagesNavComponent} from './components/pages-nav/pages-nav.component';
import {CartComponent} from './components/cart/cart.component';
import {ProductService} from "./services/product/product-service";
import {PaginationService} from "./services/pagination/pagination.service";
import {CartService} from "./services/cart/cart.service";
import {CategoryFilterComponent} from './components/category-filter/category-filter.component';
import {FiltersService} from "./services/filter/filters.service";
import {CartSummaryComponent} from './components/cart-summary/cart-summary.component';
import {FillPipe} from "./pipes/fill.pipe";
import {CartItemComponent} from './components/cart-item/cart-item.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {OrderFormComponent} from './components/order-form/order-form.component';
import {OrderSummaryComponent} from './components/order-summary/order-summary.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminComponent} from './components/admin/admin.component';
import {LoginComponent} from './components/login/login.component';
import {PriceFilterComponent} from './components/price-filter/price-filter.component';
import {NameFilterComponent} from './components/name-filter/name-filter.component';
import {DisplayService} from "./services/display/display.service";
import {OrderService} from "./services/order/order-service";
import {OrderItemComponent} from './components/order-item/order-item.component';
import {HttpClientModule} from "@angular/common/http";
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {AdminProductComponent} from './components/admin-product/admin-product.component';
import {AdminOrderComponent} from './components/admin-order/admin-order.component';
import {AuthGuard} from "./guards/AuthGuard";
import {AuthService} from "./services/auth/auth.service";
import {NotificationService} from "./services/notification/notification-service";
import {AdminAddImageComponent} from './components/admin-add-image/admin-add-image.component';
import {FileDropDirective, FileSelectDirective} from "ng2-file-upload";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'upload', component: AdminAddImageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsListComponent,
    FiltersComponent,
    ProductComponent,
    PagesNavComponent,
    CartComponent,
    CategoryFilterComponent,
    FillPipe,
    CartSummaryComponent,
    CartItemComponent,
    HomeComponent,
    OrderFormComponent,
    OrderSummaryComponent,
    AdminComponent,
    LoginComponent,
    PriceFilterComponent,
    NameFilterComponent,
    OrderItemComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminHomeComponent,
    AdminProductComponent,
    AdminOrderComponent,
    AdminAddImageComponent,
    FileSelectDirective,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProductService, CartService, PaginationService, FiltersService,
    DisplayService, OrderService, AuthGuard, AuthService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
