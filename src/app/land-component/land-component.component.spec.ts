import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandComponentComponent } from './land-component.component';

describe('LandComponentComponent', () => {
  let component: LandComponentComponent;
  let fixture: ComponentFixture<LandComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandComponentComponent]
    });
    fixture = TestBed.createComponent(LandComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
