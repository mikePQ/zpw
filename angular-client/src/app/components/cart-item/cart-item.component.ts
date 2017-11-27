import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {OrderItem} from "../../models/OrderItem";
import {ProductService} from "../../services/product/product-service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartItemComponent implements OnInit {
  @Input("orderItem")
  orderItem: OrderItem;

  @Output("removeAllProductItems")
  removeAllItemsEventEmitter: EventEmitter<string> = new EventEmitter();

  @Output("removeSingleProductItem")
  removeSingleItemEventEmitter: EventEmitter<string> = new EventEmitter();

  @Output("addProductItem")
  addProductEventEmitter: EventEmitter<Product> = new EventEmitter();

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
  }

  removeAllProductItems() {
    this.removeAllItemsEventEmitter.emit(this.orderItem.product.name);
  }

  removeSingleProductItem() {
    this.removeSingleItemEventEmitter.emit(this.orderItem.product.name);
  }

  addProductItem() {
    this.addProductEventEmitter.emit(this.orderItem.product);
  }

  isAvailable(product: Product) {
    return this.productService.isAvailable(product);
  }

}
