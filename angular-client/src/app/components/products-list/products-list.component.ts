import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Pager, PaginationService} from "../../services/pagination/pagination.service";
import {ProductService} from "../../services/product/product-service";
import {Product} from "../../models/Product";
import {EmptyFilter, Filter, FilterListener, FiltersService} from "../../services/filter/filters.service";
import {NotificationService} from "../../services/notification/notification-service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsListComponent implements OnInit, FilterListener {
  products: Array<Product>;

  pager: Pager = Pager.empty();
  pagedProducts: Array<Product>;
  currentFilter: Filter = new EmptyFilter();

  constructor(private productService: ProductService,
              private filterService: FiltersService,
              private paginationService: PaginationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.updateProducts();
    this.filterService.addFilterListener(this);

    this.notificationService.connect().subscribe(() => {
      this.updateProducts(this.currentFilter);
    });
  }

  setPage(page: number) {
    if (page < 1) {
      return;
    }

    this.pager = this.paginationService.getPager(this.products.length, page);
    this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  isAvailable(product: Product): boolean {
    return this.productService.isAvailable(product);
  }

  filterChanged(newFilter: Filter) {
    this.currentFilter = newFilter;
    this.updateProducts(newFilter);
  }

  private updateProducts(filter: Filter = new EmptyFilter()) {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = filter.filter(products);
        this.setPage(1);
      });
  }
}


