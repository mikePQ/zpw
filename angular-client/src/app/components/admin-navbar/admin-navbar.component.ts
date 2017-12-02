import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {AdminView} from "../admin/admin.component";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminNavbarComponent implements OnInit {

  @Output("changeView")
  changeViewEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin-login']);
  }

  setView(view: AdminView) {
    this.changeViewEventEmitter.emit(view);
  }

}
