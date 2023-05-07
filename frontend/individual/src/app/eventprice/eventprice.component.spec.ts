import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventpriceComponent } from './eventprice.component';

describe('EventpriceComponent', () => {
  let component: EventpriceComponent;
  let fixture: ComponentFixture<EventpriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventpriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
