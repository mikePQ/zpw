import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from "../../models/Product";
import {CartService} from "../../services/cart/cart.service";
import {DisplayService, View} from "../../services/display/display.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

  @Input("product")
  product: Product;

  @Input("isAvailable")
  isAvailable: boolean;

  constructor(private cartService: CartService,
              private displayService: DisplayService) {
  }

  ngOnInit() {
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    this.displayService.changeView(View.Cart);
  }
}
