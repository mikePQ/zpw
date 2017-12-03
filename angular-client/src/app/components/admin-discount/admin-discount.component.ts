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
  details: boolean = false;


  constructor(private discountService: DiscountService) {
  }

  ngOnInit() {
  }

  toggleDetails() {
    this.details = !this.details;
  }

  remove() {
    this.discountService.removeDiscount(this.discount).subscribe();
  }
}
