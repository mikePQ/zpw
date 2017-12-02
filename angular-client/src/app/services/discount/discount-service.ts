import {Injectable} from '@angular/core';
import {Order} from "../../models/Order";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth/auth.service";
import {Discount} from "../../models/Discount";

@Injectable()
export class DiscountService {

  private discountsApi: string = 'http://localhost:3000/discounts';

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {
  }

  // createOrder(purchaser: Purchaser): Observable<OrderSummary> {
  //   let order = new Order(purchaser, this.cartService.getOrderItems());
  //
  //   return Observable.create((observer) => {
  //     this.httpClient.post(this.discountsApi, order).subscribe(
  //       () => {
  //         this.cartService.clearCart();
  //         observer.next(new OrderSummary(order, new Date(Date.now())));
  //         observer.complete();
  //       },
  //       (error) => {
  //         observer.error(error);
  //       });
  //   });
  // }

  updateOrder(order: Order) {
    let url = this.authService.addAuthToken(`${this.discountsApi}/${order._id}`);
    return this.httpClient.put<Order>(url, order);
  }

  getDiscounts(): Observable<Array<Discount>> {
    let url = this.authService.addAuthToken(this.discountsApi);
    return this.httpClient.get<Discount[]>(url);
  }
}
