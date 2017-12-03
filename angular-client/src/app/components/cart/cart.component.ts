import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CartListener, CartService} from "../../services/cart/cart.service";
import {Product} from "../../models/Product";
import {OrderItem} from "../../models/OrderItem";
import {DisplayService, View} from "../../services/display/display.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit, CartListener {
  orderItems: Array<OrderItem> = [];

  constructor(private cartService: CartService,
              private displayService: DisplayService) {
  }

  ngOnInit() {
    this.cartService.addCartListener(this);
    this.orderItems = this.cartService.getOrderItems();
  }

  cartChanged(currentProducts: Array<Product>) {
    this.orderItems = this.cartService.getOrderItems() || [];
  }

  removeAllFromCart(productName: string) {
    this.cartService.removeProducts(productName);
  }

  removeSingleFromCart(productName: string) {
    this.cartService.removeSingleProductItem(productName);
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }

  createOrder() {
    this.displayService.changeView(View.OrderForm);
  }

  continueShopping() {
    this.displayService.changeView(View.Products);
  }
}
