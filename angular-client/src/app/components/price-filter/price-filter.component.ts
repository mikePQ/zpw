import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PriceFilterComponent implements OnInit {

  @Input()
  lowest: number;

  @Input()
  highest: number;

  @Output()
  priceFilterChanged: EventEmitter<PriceFilterChangedEvent> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  updateFilter() {
    this.priceFilterChanged.emit({
      lowest: this.lowest,
      highest: this.highest
    });
  }
}

export interface PriceFilterChangedEvent {
  lowest: number;
  highest: number;
}
