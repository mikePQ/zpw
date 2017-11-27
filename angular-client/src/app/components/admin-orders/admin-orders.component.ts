import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Order} from "../../models/Order";
import {OrderService} from "../../services/order/order-service";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminOrdersComponent implements OnInit {

  private orders: Array<Order> = [];

  @Output("returnBack")
  returnBackEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  returnBack() {
    this.returnBackEventEmitter.emit(null);
  }
}
