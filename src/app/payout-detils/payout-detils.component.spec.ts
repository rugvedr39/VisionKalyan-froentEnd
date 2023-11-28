import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutDetilsComponent } from './payout-detils.component';

describe('PayoutDetilsComponent', () => {
  let component: PayoutDetilsComponent;
  let fixture: ComponentFixture<PayoutDetilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayoutDetilsComponent]
    });
    fixture = TestBed.createComponent(PayoutDetilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
