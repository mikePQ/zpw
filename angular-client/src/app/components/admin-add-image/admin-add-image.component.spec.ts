import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddImageComponent } from './admin-add-image.component';

describe('AdminAddImageComponent', () => {
  let component: AdminAddImageComponent;
  let fixture: ComponentFixture<AdminAddImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
