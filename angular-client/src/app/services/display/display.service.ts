import {Injectable} from '@angular/core';

@Injectable()
export class DisplayService {

  private listeners: Array<ViewListener> = [];
  private currentView: View = View.Products;

  constructor() {
  }

  addViewListener(listener: ViewListener) {
    this.listeners.push(listener);
  }

  changeView(view: View) {
    this.currentView = view;
    this.listeners.forEach(listener => listener.viewChanged(view));
  }

  getCurrentView(): View {
    return this.currentView;
  }
}

export enum View {
  Products = 1, Cart = 2, OrderForm = 3, OrderSummary = 4
}

export interface ViewListener {
  viewChanged(view: View);
}

