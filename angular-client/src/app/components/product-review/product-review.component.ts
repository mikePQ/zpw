import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Review} from "../../models/Review";

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductReviewComponent implements OnInit {

  @Input()
  review: Review;

  constructor() {
  }

  ngOnInit() {
  }

}
