import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {Observable} from "rxjs/Observable";
import {CartService} from "../cart/cart.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ProductService {

  private productsApi: string = 'http://195.181.222.52:3000/products';

  constructor(private cartService: CartService,
              private authService: AuthService,
              private httpClient: HttpClient) {
  }

  getProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Product[]>(this.productsApi);
  }

  removeProduct(product: Product): Observable<any> {
    let url = this.authService.addAuthToken(`${this.productsApi}/${product._id}`);
    return this.httpClient.delete(url);
  }

  updateProduct(oldValue: Product, newValue: Product): Observable<Product> {
    let url = this.authService.addAuthToken(`${this.productsApi}/${oldValue._id}`);
    return this.httpClient.put<Product>(url, newValue);
  }

  addNew(product: object): Observable<Product> {
    let url = this.authService.addAuthToken(this.productsApi);
    return this.httpClient.post<Product>(url, product);
  }

  isAvailable(product: Product): boolean {
    let orderItems = this.cartService.getOrderItems();
    let item = orderItems.find(item => item.product.name == product.name);

    if (!item) {
      return product.available > 0;
    }

    return product.available - item.quantity > 0;
  }
}
