import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Purchaser} from "../../models/Purchaser";
import {OrderService} from "../../services/order/order-service";
import {DisplayService, View} from "../../services/display/display.service";
import {OrderSummary} from "../../models/OrderSummary";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderFormComponent implements OnInit {

  @Input()
  purchaser: Purchaser = new Purchaser();

  @Output("orderSubmitted")
  orderSubmittedEventEmitter: EventEmitter<OrderSummary> = new EventEmitter();

  constructor(private orderService: OrderService,
              private displayService: DisplayService) {
  }

  ngOnInit() {
  }

  createOrder() {
    this.orderService.createOrder(this.purchaser).subscribe(
      orderSummary => {
        this.orderSubmittedEventEmitter.emit(orderSummary);
        this.displayService.changeView(View.OrderSummary);
      },
      error => {
        alert('Wystąpił błąd. Proszę spróbować ponownie')
      });
  }
}
