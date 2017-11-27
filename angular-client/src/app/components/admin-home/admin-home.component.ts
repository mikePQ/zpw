import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHomeComponent implements OnInit {

  @Output("manage")
  manageEventEmitter: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  manage(category: string) {
    this.manageEventEmitter.emit(category);
  }

}
