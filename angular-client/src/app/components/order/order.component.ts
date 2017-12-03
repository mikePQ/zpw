import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Order} from "../../models/Order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {

  @Input("order")
  order: Order;

  totalValue: number = 0;
  details: boolean = false;

  ngOnInit() {
    if (this.order) {
      this.totalValue = this.order.orderedItems.map(item => item.product.price * item.quantity)
        .reduce((a, b) => a + b, 0);
    }
  }

  toggleDetails() {
    this.details = !this.details;
  }

}
