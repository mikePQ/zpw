import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {Review} from "../../models/Review";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class ReviewService {
  private reviewsMock: ReviewsMock = new ReviewsMock();

  constructor() {
  }

  getReviews(product: Product): Observable<Array<Review>> {
    let reviews = [];
    for (let i = 0; i < (Math.floor(Math.random() * 5) + 3); i++) {
      reviews.push(new Review(this.reviewsMock.getReviewerName(), this.reviewsMock.getReviewContent(), product.rating));
    }
    return Observable.of(reviews);
  }
}

class ReviewsMock {

  private reviewers: Array<string> = [
    "Jan Kowalski",
    "Jan Nowak",
    "Andrzej Kozłowski",
    "John Doe",
    "Janusz Kowalewski",
    "Tomasz Wiśniewski",
    "Jarosław Wójcik",
    "Krzysztof Zieliński",
    "Wiesław Kamiński"
  ];

  private reviews: Array<string> = [
    "Bardzo dobry produkt. Polecam",
    "Produkt zgodny z opisem",
    "Produkt spełnił moje oczekiwania",
    "Bardzo dobry stosunek jakości do ceny",
    "Produkt poniżej oczekiwań",
    "Ciężko znaleźć lepszy produkt w takiej cenie. Polecam",
    "Produkt bardzo nietrwały. W tej cenie powinien być lepszej jakości"
  ];

  getReviewerName(): string {
    return this.reviewers[Math.floor(Math.random() * this.reviewers.length)];
  }

  getReviewContent(): string {
    return this.reviews[Math.floor(Math.random() * this.reviews.length)];
  }
}


