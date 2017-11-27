import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Product} from "../../models/Product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product/product-service";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProductComponent implements OnInit {

  @Input("product")
  product: Product;

  @Output("productUpdated")
  productUpdatedEventEmitter: EventEmitter<Product> = new EventEmitter();

  @Output("productRemoved")
  productRemovedEventEmitter: EventEmitter<Product> = new EventEmitter();

  productForm: FormGroup;
  edit: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  toggleEdit() {
    this.edit = !this.edit;
    if (this.edit) {
      this.buildForm();
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      let product: Product = {
        _id: this.product._id,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        category: this.productForm.value.category,
        image: this.productForm.value.image,
        rating: this.productForm.value.rating,
        available: this.productForm.value.available
      };

      this.productService.updateProduct(this.product, product).subscribe(product => {
          console.log("Product updated");
          this.edit = false;
          this.productUpdatedEventEmitter.emit(product);
        },
        error => {
          console.log(error);
        });
    }
  }

  cancelEdit() {
    this.edit = false;
  }

  deleteProduct() {
    this.productService.removeProduct(this.product).subscribe(() => {
        console.log("Product removed");
        this.productRemovedEventEmitter.emit(this.product);
      },
      error => {
        console.log(error);
      });
  }

  private buildForm() {
    this.productForm = this.formBuilder.group({
      name: this.product ? this.product.name : '',
      category: this.product ? this.product.category : '',
      price: this.product ? this.product.price : '',
      image: this.product ? this.product.image : '',
      rating: this.product ? this.product.rating : '',
      available: this.product ? this.product.available : '',
      description: this.product ? this.product.description : ''
    });
  }
}
