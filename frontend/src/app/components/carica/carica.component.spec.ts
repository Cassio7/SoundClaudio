import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaricaComponent } from './carica.component';

describe('CaricaComponent', () => {
  let component: CaricaComponent;
  let fixture: ComponentFixture<CaricaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaricaComponent]
    });
    fixture = TestBed.createComponent(CaricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
