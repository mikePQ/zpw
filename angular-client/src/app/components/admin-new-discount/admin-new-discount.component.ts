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
  products: Array<Product> = [];

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
      this.products = products;
    });
  }

  buildForm() {
    this.newDiscountForm = this.formBuilder.group({
      startTime: '',
      endTime: '',
      percentage: '',
      products: ''
    });
  }

  cancel() {
    this.cancelEventEmitter.emit('cancel');
  }

  apply() {
    if (this.newDiscountForm.valid) {
      let discount = {
        startTime: 1,
        endTime: 2,
        percentage: 10,
        products: []
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
}
