import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";

@Injectable()
export class FiltersService {
  private filterListeners: Array<FilterListener> = [];
  private currentFilter: Filter = new EmptyFilter();

  constructor() {
  }

  setCurrentFilter(filter: Filter) {
    this.currentFilter = filter;
    this.notifyFilterChanged(filter);
  }

  addFilterListener(filterListener: FilterListener) {
    this.filterListeners.push(filterListener);
  }

  private notifyFilterChanged(newFilter: Filter) {
    console.log(this.filterListeners);
    this.filterListeners.forEach(listener => listener.filterChanged(newFilter));
  }
}

export interface Filter {
  filter(array: Array<Product>): Array<Product>
}

export class EmptyFilter implements Filter {
  filter(array: Array<Product>): Array<Product> {
    return array;
  }
}

export class CategoriesFilter implements Filter {
  constructor(private categories: Array<string>) {
  }

  filter(array: Array<Product>): Array<Product> {
    if (this.categories.length < 1) {
      return array;
    }

    return array.filter(product => this.categories.includes(product.category));
  }

  getCategories(): Array<string> {
    return this.categories.slice();
  }
}

export class NameFilter implements Filter {
  constructor(private name: string) {
  }

  filter(array: Array<Product>): Array<Product> {
    return array.filter(product => product.name.toLowerCase().includes(this.name.toLowerCase()));
  }
}

export class PriceFilter implements Filter {
  constructor(private lowest: number,
              private highest: number) {
  }

  filter(array: Array<Product>): Array<Product> {
    return array.filter(product => {
      if (this.highest && this.highest > 0) {
        if (this.lowest && this.lowest > 0) {
          return product.price >= this.lowest && product.price <= this.highest;
        }
        return product.price <= this.highest;
      } else {
        if (this.lowest && this.lowest > 0) {
          return product.price >= this.lowest;
        }
      }
      return true;
    });
  }
}

export class AndFilter implements Filter {
  constructor(private filters: Array<Filter>) {
  }

  filter(array: Array<Product>): Array<Product> {
    let result = array;
    for (let filter of this.filters) {
      result = filter.filter(result);
    }
    return result;
  }
}

export interface FilterListener {
  filterChanged(newFilter: Filter);
}
