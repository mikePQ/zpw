import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Order} from "../../models/Order";

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminOrderComponent implements OnInit {

  @Input("order")
  order: Order;

  totalValue: number = 0;
  details: boolean = false;


  constructor() {
  }

  ngOnInit() {
    if (this.order) {

      console.log(this.order);
      this.totalValue = this.order.orderedItems.map(item => item.product.price * item.quantity)
        .reduce((a, b) => a + b, 0);
    }
  }

  toggleDetails() {
    this.details = !this.details;
  }
}
