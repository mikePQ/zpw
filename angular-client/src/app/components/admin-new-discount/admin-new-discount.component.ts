import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Product} from "../../models/Product";
import {ProductService} from "../../services/product/product-service";
import {DiscountService} from "../../services/discount/discount-service";

@Component({
  selector: 'app-admin-new-discount',
  templateUrl: './admin-new-discount.component.html',
  styleUrls: ['./admin-new-discount.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminNewDiscountComponent implements OnInit {
  newDiscountForm: FormGroup;
  productForm: FormGroup;
  products: Array<any> = [];

  @Output("cancel")
  cancelEventEmitter: EventEmitter<any> = new EventEmitter();

  @Output("created")
  createdEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private discountService: DiscountService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.buildForm();
    this.productService.getProducts().subscribe(products => {
      this.products = this.createProductsControls(products);
    });
  }

  buildForm() {
    this.newDiscountForm = this.formBuilder.group({
      startTime: '',
      endTime: '',
      percentage: '',
      products: '',
    });

    this.productForm = this.formBuilder.group({
      products: ''
    });
  }

  cancel() {
    this.cancelEventEmitter.emit('cancel');
  }

  apply() {
    if (this.newDiscountForm.valid) {

      let products = this.getProducts();
      console.log(products);

      let discount = {
        startTime: this.getTime(this.newDiscountForm.value.startTime),
        endTime: this.getTime(this.newDiscountForm.value.endTime),
        percentage: this.newDiscountForm.value.percentage,
        products: this.getProducts()
      };

      this.discountService.createNew(discount).subscribe(() => {
        this.createdEventEmitter.emit(discount);
      }, error => {
        //todo
      });

    } else {
      //todo warn
    }
  }

  private getProducts(): Array<string> {
    return this.products.filter(productControl => productControl.selected)
      .map(productControl => productControl.element.name);
  }

  private getTime(datetime: string): number {
    return Date.parse(datetime) / 1000;
  }

  private createProductsControls(products: Array<Product>): Array<any> {
    return products.map(product => {
      return {
        element: product,
        selected: false
      }
    });
  }
}
