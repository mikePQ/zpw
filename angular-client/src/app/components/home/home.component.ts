import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DisplayService, View, ViewListener} from "../../services/display/display.service";
import {OrderSummary} from "../../models/OrderSummary";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, ViewListener {
  currentView: View;
  orderSummary: OrderSummary;

  constructor(private displayService: DisplayService) {
  }

  ngOnInit(): void {
    this.currentView = this.displayService.getCurrentView();
    this.displayService.addViewListener(this);
  }

  viewChanged(view: View) {
    this.currentView = view;
  }

  orderSubmitted(orderSummary: OrderSummary) {
    this.orderSummary = orderSummary;
  }
}
