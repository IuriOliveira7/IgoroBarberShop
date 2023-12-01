import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteInicioComponent } from './componente-inicio.component';

describe('ComponenteInicioComponent', () => {
  let component: ComponenteInicioComponent;
  let fixture: ComponentFixture<ComponenteInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteInicioComponent]
    });
    fixture = TestBed.createComponent(ComponenteInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
