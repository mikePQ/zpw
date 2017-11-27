import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-name-filter',
  templateUrl: './name-filter.component.html',
  styleUrls: ['./name-filter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NameFilterComponent implements OnInit {

  @Input()
  name: string;

  @Output()
  nameFilterChanged: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  updateFilter() {
    this.nameFilterChanged.emit(this.name);
  }
}
