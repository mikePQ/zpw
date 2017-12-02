import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Order, OrderStatus} from "../../models/Order";
import {OrderService} from "../../services/order/order-service";

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminOrderComponent implements OnInit {

  @Input("order")
  order: Order;

  @Output("orderCompleted")
  orderCompletedEventEmitter: EventEmitter<Order> = new EventEmitter();

  totalValue: number = 0;
  details: boolean = false;


  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    if (this.order) {
      this.totalValue = this.order.orderedItems.map(item => item.product.price * item.quantity)
        .reduce((a, b) => a + b, 0);
    }
  }

  toggleDetails() {
    this.details = !this.details;
  }

  markAsCompleted() {
    this.order.orderStatus = OrderStatus.COMPLETED;
    this.orderService.updateOrder(this.order).subscribe(order => {
      this.orderCompletedEventEmitter.emit(order);
    });
  }
}
