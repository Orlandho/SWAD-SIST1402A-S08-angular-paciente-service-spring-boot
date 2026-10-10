import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { PacienteForm } from './paciente-form';
import { PacienteService } from '../../services/paciente.service';

describe('PacienteForm Component (SIST1402A Semana 8 Lab 08)', () => {
  let component: PacienteForm;
  let fixture: ComponentFixture<PacienteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteForm],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => null
              }
            }
          }
        },
        PacienteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse en modo registro nuevo por defecto', () => {
    expect(component).toBeTruthy();
    expect(component.editando).toBe(false);
    expect(component.form.valid).toBe(false);
  });

  it('debe validar DNI de 8 digitos y diagnostico mayor a 5 caracteres', () => {
    component.form.patchValue({
      nombre: 'Pérez Carlos',
      dni: '123', // invalido
      edad: 40,
      diagnostico: 'Grip', // menos de 5 chars
      triaje: 'Bajo',
      telefono: '987654321'
    });

    expect(component.form.controls.dni.valid).toBe(false);
    expect(component.form.controls.diagnostico.valid).toBe(false);
    expect(component.form.valid).toBe(false);

    component.form.patchValue({
      dni: '12345678',
      diagnostico: 'Gripe estacional con fiebre'
    });

    expect(component.form.controls.dni.valid).toBe(true);
    expect(component.form.controls.diagnostico.valid).toBe(true);
    expect(component.form.valid).toBe(true);
  });
});
