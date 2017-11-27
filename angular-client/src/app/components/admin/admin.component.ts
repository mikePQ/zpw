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
    this.currentView = category == "products" ? AdminView.Products : AdminView.Orders;
  }

  setView(view: AdminView) {
    this.currentView = view;
  }
}

enum AdminView {
  Home = 1, Orders = 2, Products = 3
}
