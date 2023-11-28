import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmiComponent } from './add-emi.component';

describe('AddEmiComponent', () => {
  let component: AddEmiComponent;
  let fixture: ComponentFixture<AddEmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmiComponent]
    });
    fixture = TestBed.createComponent(AddEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
