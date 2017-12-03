import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Order, OrderStatus} from "../../models/Order";
import {OrderService} from "../../services/order/order-service";
import {NotificationService} from "../../services/notification/notification-service";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminOrdersComponent implements OnInit {

  private submittedOrders: Array<Order> = [];
  private completedOrders: Array<Order> = [];

  @Output("returnBack")
  returnBackEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private orderService: OrderService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.updateOrders();
    this.notificationService.connect().subscribe(() => {
      this.updateOrders();
    });
  }

  returnBack() {
    this.returnBackEventEmitter.emit(null);
  }

  updateOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.submittedOrders = orders.filter(order => order.orderStatus != OrderStatus.COMPLETED);
      this.completedOrders = orders.filter(order => order.orderStatus == OrderStatus.COMPLETED);
    });
  }
}
