import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ProductService} from "../../services/product/product-service";
import {Product} from "../../models/Product";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProductsComponent implements OnInit {

  products: Array<Product> = [];

  @Output("returnBack")
  returnBackEventEmitter: EventEmitter<any> = new EventEmitter();

  newProductForm: FormGroup;
  createNew: boolean = false;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.updateProducts();
    this.buildForm();
  }

  updateProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  returnBack() {
    this.returnBackEventEmitter.emit(null);
  }

  toggleCreateNew() {
    this.createNew = !this.createNew;
    if (this.createNew) {
      this.buildForm();
    }
  }

  cancelCreateNew() {
    this.createNew = false;
  }

  createNewProduct() {
    if (this.newProductForm.valid) {
      let product = {
        name: this.newProductForm.value.name,
        description: this.newProductForm.value.description,
        price: this.newProductForm.value.price,
        category: this.newProductForm.value.category,
        image: this.newProductForm.value.image,
        rating: this.newProductForm.value.rating,
        available: this.newProductForm.value.available
      };

      this.productService.addNew(product).subscribe(product => {
        console.log("Product added");
        this.createNew = false;
        this.updateProducts();
      }, error => {
        console.log(error);
      });
    }
  }

  private buildForm() {
    this.newProductForm = this.formBuilder.group({
      name: '',
      category: '',
      price: '',
      image: '',
      rating: '',
      available: '',
      description: ''
    });
  }
}
