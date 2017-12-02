import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DiscountService} from "../../services/discount/discount-service";
import {Discount} from "../../models/Discount";

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminDiscountsComponent implements OnInit {

  private currentDiscounts: Array<Discount> = [];
  private previousDiscounts: Array<Discount> = [];

  @Output("returnBack")
  returnBackEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private discountService: DiscountService) {
  }

  ngOnInit() {
    this.updateOrders();
  }

  returnBack() {
    this.returnBackEventEmitter.emit(null);
  }

  updateOrders() {
    let now = Date.now() / 1000;

    this.discountService.getDiscounts().subscribe(discounts => {
      this.currentDiscounts = discounts.filter(discount => discount.startTime <= now && discount.endTime > now);
      this.previousDiscounts = discounts.filter(discount => discount.endTime <= now);
    });
  }

}
