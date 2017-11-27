import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryFilterComponent implements OnInit {
  @Input("category")
  category: string;

  @Output()
  categorySelectionChanged: EventEmitter<SelectionChangedEvent> = new EventEmitter();
  isSelected: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  toggleSelected() {
    this.isSelected = !this.isSelected;
    this.categorySelectionChanged.emit({
      "categoryName": this.category,
      "isSelected": this.isSelected
    });
  }
}

export interface SelectionChangedEvent {
  categoryName: string;
  isSelected: boolean;
}
