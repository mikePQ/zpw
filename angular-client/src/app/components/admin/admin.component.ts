import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  currentView: AdminView = AdminView.Home;

  constructor() {
  }

  ngOnInit() {
  }

  manage(category) {
    if (category == 'products') {
      this.currentView = AdminView.Products;
    } else if (category == 'orders') {
      this.currentView = AdminView.Orders
    } else if (category == 'discounts') {
      this.currentView = AdminView.Discounts
    }
  }

  setView(view: AdminView) {
    this.currentView = view;
  }
}

export enum AdminView {
  Home = 1, Orders = 2, Products = 3, Discounts = 4
}
