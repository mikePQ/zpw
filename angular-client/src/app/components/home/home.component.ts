import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DisplayService, View, ViewListener} from "../../services/display/display.service";
import {OrderSummary} from "../../models/OrderSummary";
import {NotificationService} from "../../services/notification/notification-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, ViewListener {
  currentView: View;
  orderSummary: OrderSummary;

  constructor(private displayService: DisplayService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.currentView = this.displayService.getCurrentView();
    this.displayService.addViewListener(this);

    this.notificationService.connect().subscribe(event => {
      alert(event);
    }, error => {
      console.log(error);
    });
  }

  viewChanged(view: View) {
    this.currentView = view;
  }

  orderSubmitted(orderSummary: OrderSummary) {
    this.orderSummary = orderSummary;
  }
}
