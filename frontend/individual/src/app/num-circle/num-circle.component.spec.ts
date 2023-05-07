import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumCircleComponent } from './num-circle.component';

describe('NumCircleComponent', () => {
  let component: NumCircleComponent;
  let fixture: ComponentFixture<NumCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumCircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
