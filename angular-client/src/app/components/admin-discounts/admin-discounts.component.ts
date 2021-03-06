import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {DiscountService} from "../../services/discount/discount-service";
import {Discount} from "../../models/Discount";
import {AdminNewDiscountComponent} from "../admin-new-discount/admin-new-discount.component";
import {NotificationService} from "../../services/notification/notification-service";

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminDiscountsComponent implements OnInit {

  createNew: boolean = false;
  currentDiscounts: Array<Discount> = [];
  previousDiscounts: Array<Discount> = [];

  @Output("returnBack")
  returnBackEventEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild(AdminNewDiscountComponent)
  newDiscount: AdminNewDiscountComponent;

  constructor(private discountService: DiscountService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.updateDiscounts();
    this.notificationService.connect().subscribe(() => {
      this.updateDiscounts();
    });
  }

  returnBack() {
    this.returnBackEventEmitter.emit(null);
  }

  updateDiscounts() {
    let now = Date.now() / 1000;

    this.discountService.getDiscounts().subscribe(discounts => {
      this.currentDiscounts = discounts.filter(discount => discount.startTime <= now && discount.endTime > now);
      this.previousDiscounts = discounts.filter(discount => discount.endTime <= now);
    });
  }

  toggleCreateNew() {
    this.createNew = !this.createNew;
    if (this.createNew && this.newDiscount) {
      this.newDiscount.buildForm();
    }
  }

  cancelCreateNew() {
    this.createNew = false;
  }

  discountCreated() {
    this.createNew = false;
    this.updateDiscounts();
  }
}
