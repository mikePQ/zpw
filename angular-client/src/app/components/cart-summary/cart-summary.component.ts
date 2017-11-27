import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CartListener, CartService} from "../../services/cart/cart.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartSummaryComponent implements OnInit, CartListener {
  private productsInCart: number = 0;
  private totalValue: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.addCartListener(this);
  }

  cartChanged(currentProducts: Array<Product>) {
    this.productsInCart = this.cartService.getProducts().length;
    this.totalValue = this.cartService.getTotalValue();
  }
}
