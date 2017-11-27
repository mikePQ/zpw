import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Pager} from "../../services/pagination/pagination.service";

@Component({
  selector: 'app-pages-nav',
  templateUrl: './pages-nav.component.html',
  styleUrls: ['./pages-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PagesNavComponent implements OnInit {

  @Input("pager")
  pager: Pager;

  @Output()
  changePageEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  changePage(page: number) {
    this.changePageEventEmitter.emit(page);
  }
}
