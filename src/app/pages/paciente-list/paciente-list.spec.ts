import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PacienteList } from './paciente-list';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';

describe('PacienteList Component (SIST1402A Semana 8 Lab 08)', () => {
  let component: PacienteList;
  let fixture: ComponentFixture<PacienteList>;
  let pacienteService: PacienteService;

  const mockPacientes: Paciente[] = [
    {
      id: 1,
      nombre: 'Pérez Quispe Juan',
      edad: 45,
      dni: '72345678',
      diagnostico: 'Crisis asmática',
      activo: true,
      triaje: 'Critico',
      fechaIngreso: '2026-10-10',
      telefono: '987654321'
    },
    {
      id: 2,
      nombre: 'Gómez Soto Ana',
      edad: 28,
      dni: '45678901',
      diagnostico: 'Cefalea tensional',
      activo: true,
      triaje: 'Bajo',
      fechaIngreso: '2026-10-10',
      telefono: '912345678'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        PacienteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteList);
    component = fixture.componentInstance;
    pacienteService = TestBed.inject(PacienteService);
  });

  it('debe inicializarse y cargar pacientes reactivamente', () => {
    // @ts-ignore
    pacienteService.listar = () => of(mockPacientes);

    component.cargarPacientes();

    expect(component.pacientes().length).toBe(2);
    expect(component.totalPacientes()).toBe(2);
    expect(component.totalCriticos()).toBe(1);
    expect(component.totalBajos()).toBe(1);
  });

  it('debe filtrar adecuadamente por nivel de triaje', () => {
    // @ts-ignore
    pacienteService.listar = () => of(mockPacientes);
    component.cargarPacientes();

    component.seleccionarFiltro('Critico');
    expect(component.pacientesFiltrados().length).toBe(1);
    expect(component.pacientesFiltrados()[0].dni).toBe('72345678');

    component.seleccionarFiltro('TODOS');
    expect(component.pacientesFiltrados().length).toBe(2);
  });

  it('debe capturar error HTTP si el backend no responde', () => {
    // @ts-ignore
    pacienteService.listar = () => throwError(() => ({ status: 0, message: 'Connection refused' }));

    component.cargarPacientes();

    expect(component.pacientes().length).toBe(0);
    expect(component.error()).toContain('Error HTTP');
  });
});
