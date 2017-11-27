import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderItem} from "../../models/OrderItem";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderItemComponent implements OnInit {
  @Input("orderItem")
  orderItem: OrderItem;

  constructor() {
  }

  ngOnInit() {
  }

}
