import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  @Input("product")
  product: Product;

  @Input("isAvailable")
  isAvailable: boolean;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {size: "lg", windowClass: 'modal-xxl'})
      .result
      .then(() => {}, () => {});
  }
}
