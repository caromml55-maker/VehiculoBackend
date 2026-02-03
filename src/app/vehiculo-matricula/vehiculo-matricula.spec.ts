import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoMatricula } from './vehiculo-matricula';

describe('VehiculoMatricula', () => {
  let component: VehiculoMatricula;
  let fixture: ComponentFixture<VehiculoMatricula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoMatricula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoMatricula);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
