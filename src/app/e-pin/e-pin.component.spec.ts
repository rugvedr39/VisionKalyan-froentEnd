import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPinComponent } from './e-pin.component';

describe('EPinComponent', () => {
  let component: EPinComponent;
  let fixture: ComponentFixture<EPinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EPinComponent]
    });
    fixture = TestBed.createComponent(EPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
