import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../../models/Product";
import {DisplayService, View} from "../../services/display/display.service";
import {CartService} from "../../services/cart/cart.service";

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

  constructor(private modalService: NgbModal,
              private cartService: CartService,
              private displayService: DisplayService) {
  }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {size: "lg", windowClass: 'modal-xxl'})
      .result
      .then(() => {
      }, () => {
      });
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    this.displayService.changeView(View.Cart);
  }

}
