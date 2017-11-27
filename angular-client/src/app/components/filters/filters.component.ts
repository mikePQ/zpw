import {Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {
  AndFilter,
  CategoriesFilter,
  EmptyFilter,
  Filter,
  FiltersService,
  NameFilter,
  PriceFilter
} from "../../services/filter/filters.service";
import {ProductService} from "../../services/product/product-service";
import {CategoryFilterComponent, SelectionChangedEvent} from "../category-filter/category-filter.component";
import {Utils} from "../../utils/Utils";
import {PriceFilterChangedEvent, PriceFilterComponent} from "../price-filter/price-filter.component";
import {NameFilterComponent} from "../name-filter/name-filter.component";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit {
  private categoriesFilter: CategoriesFilter = new CategoriesFilter([]);
  private nameFilter: Filter = new EmptyFilter();
  private priceFilter: Filter = new EmptyFilter();
  categories: Array<string>;

  @ViewChild(NameFilterComponent) nameFilterComponent: NameFilterComponent;
  @ViewChild(PriceFilterComponent) priceFilterComponent: PriceFilterComponent;
  @ViewChildren(CategoryFilterComponent) allCategoriesComponents: QueryList<CategoryFilterComponent>;

  constructor(private productService: ProductService,
              private filtersService: FiltersService) {
  }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(products => {
        this.categories = Array.from(new Set(products.map(product => product.category)));
      });
  }

  updateNameFilter(newName: string) {
    this.nameFilter = new NameFilter(newName);
    this.updateCurrentFilter();
  }

  updatePriceFilter(priceFilterChangedEvent: PriceFilterChangedEvent) {
    this.priceFilter = new PriceFilter(priceFilterChangedEvent.lowest, priceFilterChangedEvent.highest);
    this.updateCurrentFilter();
  }

  updateCategoriesFilter(categorySelection: SelectionChangedEvent) {
    this.categoriesFilter = this.createNewCategoriesFilter(categorySelection);
    this.updateCurrentFilter();
  }

  updateCurrentFilter() {
    let filter = new AndFilter([this.priceFilter, this.nameFilter, this.categoriesFilter]);
    this.filtersService.setCurrentFilter(filter);
  }

  resetFilters() {
    this.nameFilterComponent.name = "";
    this.priceFilterComponent.lowest = null;
    this.priceFilterComponent.highest = null;

    this.allCategoriesComponents.filter(categoryComponent => categoryComponent.isSelected)
      .forEach(categoryComponent => categoryComponent.toggleSelected());
    this.nameFilter = new EmptyFilter();
    this.priceFilter = new EmptyFilter();

    this.updateCurrentFilter();
  }

  private createNewCategoriesFilter(categorySelection: SelectionChangedEvent) {
    let currentCategories = this.categoriesFilter.getCategories();
    if (categorySelection.isSelected) {
      currentCategories.push(categorySelection.categoryName);
      return new CategoriesFilter(Array.from(new Set(currentCategories)));
    } else {
      let categories = Utils.removeElement(currentCategories, categorySelection.categoryName);
      return new CategoriesFilter(categories);
    }
  }
}





