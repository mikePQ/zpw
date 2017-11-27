import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderSummary} from "../../models/OrderSummary";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderSummaryComponent implements OnInit {

  @Input("orderSummary")
  orderSummary: OrderSummary;

  constructor() {
  }

  ngOnInit() {
  }

}
