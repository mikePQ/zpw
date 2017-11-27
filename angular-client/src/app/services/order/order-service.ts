import {Injectable} from '@angular/core';
import {CartService} from "../cart/cart.service";
import {Purchaser} from "../../models/Purchaser";
import {OrderSummary} from "../../models/OrderSummary";
import {Order} from "../../models/Order";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class OrderService {

  private ordersApi: string = 'http://localhost:3000/orders';

  constructor(private cartService: CartService,
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

  getOrders(): Observable<Array<Order>> {
    return this.httpClient.get<Order[]>(this.ordersApi);
  }
}
