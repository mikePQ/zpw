import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Discount} from "../../models/Discount";
import {DiscountService} from "../../services/discount/discount-service";

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminDiscountComponent implements OnInit {

  @Input("discount")
  discount: Discount;

  // @Output("orderCompleted")
  // orderCompletedEventEmitter: EventEmitter<Order> = new EventEmitter();
  //
  // totalValue: number = 0;
  details: boolean = false;


  constructor(private discountService: DiscountService) {
  }

  ngOnInit() {
  }

  toggleDetails() {
    this.details = !this.details;
  }

  // markAsCompleted() {
  //   this.order.orderStatus = OrderStatus.COMPLETED;
  //   this.orderService.updateOrder(this.order).subscribe(order => {
  //     this.orderCompletedEventEmitter.emit(order);
  //   });
  // }

}
