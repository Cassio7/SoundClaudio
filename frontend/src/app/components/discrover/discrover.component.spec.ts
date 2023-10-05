import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscroverComponent } from './discrover.component';

describe('DiscroverComponent', () => {
  let component: DiscroverComponent;
  let fixture: ComponentFixture<DiscroverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscroverComponent]
    });
    fixture = TestBed.createComponent(DiscroverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
