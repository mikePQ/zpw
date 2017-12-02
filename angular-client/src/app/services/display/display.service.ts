import {Injectable} from '@angular/core';

@Injectable()
export class DisplayService {

  private listeners: Array<ViewListener> = [];
  private currentView: View = View.Products;
  private previousView: View = View.Products;

  constructor() {
  }

  addViewListener(listener: ViewListener) {
    this.listeners.push(listener);
  }

  changeView(view: View) {
    this.previousView = this.currentView;
    this.currentView = view;
    this.listeners.forEach(listener => listener.viewChanged(view));
  }

  getCurrentView(): View {
    return this.currentView;
  }

  getPreviousView(): View {
    return this.previousView;
  }
}

export enum View {
  Products = 1, Cart = 2, OrderForm = 3, OrderSummary = 4, SignIn = 5, SignUp = 6
}

export interface ViewListener {
  viewChanged(view: View);
}

