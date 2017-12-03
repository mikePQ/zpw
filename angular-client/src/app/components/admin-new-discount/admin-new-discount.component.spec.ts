import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewDiscountComponent } from './admin-new-discount.component';

describe('AdminNewDiscountComponent', () => {
  let component: AdminNewDiscountComponent;
  let fixture: ComponentFixture<AdminNewDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
