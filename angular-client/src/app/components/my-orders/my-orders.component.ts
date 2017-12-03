import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Order} from "../../models/Order";
import {OrderService} from "../../services/order/order-service";
import {NotificationService} from "../../services/notification/notification-service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyOrdersComponent implements OnInit {

  orders: Array<Order> = [];

  constructor(private orderService: OrderService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.updateOrders();
    this.notificationService.connect().subscribe(() => {
      this.updateOrders();
    });
  }


  updateOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
}
