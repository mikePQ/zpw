import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ProductService} from "../../services/product/product-service";
import {Product} from "../../models/Product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FileItem, FileUploader} from "ng2-file-upload";
import {NotificationService} from "../../services/notification/notification-service";

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

  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/images',
    queueLimit: 1
  });

  hasDropZoneOver: boolean = false;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.updateProducts();
    this.buildForm();

    this.notificationService.connect().subscribe(() => {
      this.updateProducts();
    });

    this.uploader.onAfterAddingFile = (item: FileItem) => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }

      let fileExtension = '.' + item.file.name.split('.').pop();
      item.file.name = this.newProductForm.value.name ? encodeURIComponent(this.newProductForm.value.name) + fileExtension : item.file.name;
    };
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
    if (this.newProductForm.valid && this.uploader.queue.length === 1) {
      let image = this.createImageUrl(this.newProductForm.value.name);

      let product = {
        name: this.newProductForm.value.name,
        description: this.newProductForm.value.description,
        price: this.newProductForm.value.price,
        image: image,
        category: this.newProductForm.value.category,
        rating: this.newProductForm.value.rating,
        available: this.newProductForm.value.available
      };

      this.uploader.uploadItem(this.uploader.queue[0]);

      this.productService.addNew(product).subscribe(product => {
        this.createNew = false;
        this.updateProducts();
      }, error => {
        console.log(error);
      });
    }
  }

  fileOverDropZone(fileOverDropZone: boolean) {
    this.hasDropZoneOver = fileOverDropZone;
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

  private createImageUrl(productName: string) {
    let fileName = this.uploader.queue[0].file.name;
    let fileExtension = '.' + fileName.split('.').pop();
    return 'http://localhost:3000/static/images/' + encodeURIComponent(productName) + fileExtension;
  }
}
