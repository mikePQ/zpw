import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {OrderItem} from "../../models/OrderItem";
import {Utils} from "../../utils/Utils";

@Injectable()
export class CartService {
  private products: Array<Product> = [];
  private cartListeners: Array<CartListener> = [];

  constructor() {
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.notifyListeners();
  }

  removeProducts(name: string) {
    this.products = this.products.filter(element => element.name != name);
    this.notifyListeners();
  }

  removeSingleProductItem(productName: string) {
    let product = this.products.find(product => product.name == productName);
    this.products = Utils.removeElement(this.products, product);
    this.notifyListeners();
  }

  addCartListener(cartListener: CartListener) {
    this.cartListeners.push(cartListener);
  }

  getProducts(): Array<Product> {
    return this.products.slice();
  }

  getOrderItems(): Array<OrderItem> {
    let withoutDuplicates = this.removeDuplicates(this.products);
    return withoutDuplicates.map(product => new OrderItem(product,
      this.products.filter((element, index, self) =>
        product.name === element.name).length));
  }

  getTotalValue(): number {
    return this.products.map(product => product.price)
      .reduce((a, b) => a + b, 0);
  }

  clearCart() {
    this.products = [];
    this.notifyListeners();
  }

  private notifyListeners() {
    this.cartListeners.forEach(listener => listener.cartChanged(this.products));
  }

  private removeDuplicates(array: Array<Product>): Array<Product> {
    let result = array.slice();
    result = result.filter((element, index, self) =>
      index === self.findIndex(product => product.name === element.name));

    return result;
  }
}

export interface CartListener {
  cartChanged(currentProducts: Array<Product>);
}
