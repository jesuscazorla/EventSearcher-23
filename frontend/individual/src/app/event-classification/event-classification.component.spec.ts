import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventClassificationComponent } from './event-classification.component';

describe('EventClassificationComponent', () => {
  let component: EventClassificationComponent;
  let fixture: ComponentFixture<EventClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
