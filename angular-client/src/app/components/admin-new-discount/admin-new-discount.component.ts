import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-new-discount',
  templateUrl: './admin-new-discount.component.html',
  styleUrls: ['./admin-new-discount.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminNewDiscountComponent implements OnInit {
  newDiscountForm: FormGroup;
  time = {hour: 13, minute: 30};

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.newDiscountForm = this.formBuilder.group({
      startTime: '',
      endTime: '',
      percentage: '',
      products: ''
    });
  }
}
