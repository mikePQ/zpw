import {Injectable} from '@angular/core';
import {CartService} from "../cart/cart.service";
import {Purchaser} from "../../models/Purchaser";
import {OrderSummary} from "../../models/OrderSummary";
import {Order} from "../../models/Order";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class OrderService {

  private ordersApi: string = 'http://localhost:3000/orders';

  constructor(private cartService: CartService,
              private authService: AuthService,
              private httpClient: HttpClient) {
  }

  createOrder(purchaser: Purchaser): Observable<OrderSummary> {
    let order = new Order(purchaser, this.cartService.getOrderItems());

    return Observable.create((observer) => {
      this.httpClient.post(this.ordersApi, order).subscribe(
        () => {
          this.cartService.clearCart();
          observer.next(new OrderSummary(order, new Date(Date.now())));
          observer.complete();
        },
        (error) => {
          observer.error(error);
        });
    });
  }

  updateOrder(order: Order) {
    let url = this.authService.addAuthToken(`${this.ordersApi}/${order._id}`);
    return this.httpClient.put<Order>(url, order);
  }

  getOrders(): Observable<Array<Order>> {
    let url = this.authService.addAuthToken(this.ordersApi);
    return this.httpClient.get<Order[]>(url);
  }
}
