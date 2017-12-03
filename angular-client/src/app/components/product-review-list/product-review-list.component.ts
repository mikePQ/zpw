import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Pager, PaginationService} from "../../services/pagination/pagination.service";
import {ReviewService} from "../../services/review/review-service";
import {Review} from "../../models/Review";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-product-review-list',
  templateUrl: './product-review-list.component.html',
  styleUrls: ['./product-review-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductReviewListComponent implements OnInit {

  @Input()
  product: Product;

  reviews: Array<Review>;

  pager: Pager = Pager.empty();
  pagedReviews: Array<Review>;

  constructor(private reviewService: ReviewService,
              private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.updateReviews();
  }

  setPage(page: number) {
    if (page < 1) {
      return;
    }

    this.pager = this.paginationService.getPager(this.reviews.length, page);
    this.pagedReviews = this.reviews.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  private updateReviews() {
    this.reviewService.getReviews(this.product)
      .subscribe(reviews => {
        this.reviews = reviews;
        this.setPage(1);
      });
  }
}
