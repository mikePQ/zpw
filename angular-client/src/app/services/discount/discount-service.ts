import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth/auth.service";
import {Discount} from "../../models/Discount";

@Injectable()
export class DiscountService {

  private discountsApi: string = 'http://localhost:3000/discounts';

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {
  }

  getDiscounts(): Observable<Array<Discount>> {
    let url = this.authService.addAuthToken(this.discountsApi);
    return this.httpClient.get<Discount[]>(url);
  }

  createNew(discount: any): Observable<any> {
    let url = this.authService.addAuthToken(this.discountsApi);
    return this.httpClient.post(url, discount);
  }

  removeDiscount(discount: Discount): Observable<any> {
    let url = this.authService.addAuthToken(`${this.discountsApi}/${discount._id}`);
    return this.httpClient.delete(url);
  }
}
