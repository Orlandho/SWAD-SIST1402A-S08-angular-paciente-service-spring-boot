import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PacienteService } from './paciente.service';
import { Paciente } from '../models/paciente.model';

describe('PacienteService (SIST1402A Semana 8 Lab 08)', () => {
  let service: PacienteService;
  let httpTesting: HttpTestingController;

  const mockPacientes: Paciente[] = [
    {
      id: 1,
      nombre: 'Pérez Quispe Juan',
      edad: 45,
      dni: '72345678',
      diagnostico: 'Hipertensión severa',
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
      diagnostico: 'Esguince grado 1',
      activo: true,
      triaje: 'Bajo',
      fechaIngreso: '2026-10-10',
      telefono: '912345678'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PacienteService
      ]
    });

    service = TestBed.inject(PacienteService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('listar() debe cumplir el contrato institucional y retornar Observable<Paciente[]>', () => {
    service.listar().subscribe(pacientes => {
      expect(pacientes.length).toBe(2);
      expect(pacientes[0].nombre).toBe('Pérez Quispe Juan');
      expect(pacientes[0].triaje).toBe('Critico');
    });

    const req = httpTesting.expectOne(service.getUrl());
    expect(req.request.method).toBe('GET');
    req.flush(mockPacientes);
  });

  it('buscarPorId() debe enviar peticion GET al endpoint con identificador', () => {
    service.buscarPorId(1).subscribe(p => {
      expect(p.dni).toBe('72345678');
    });

    const req = httpTesting.expectOne(`${service.getUrl()}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPacientes[0]);
  });

  it('registrar() debe enviar POST con datos del paciente', () => {
    const nuevo: Paciente = {
      nombre: 'Rojas Díaz Carlos',
      edad: 34,
      dni: '87654321',
      diagnostico: 'Gastroenteritis',
      activo: true,
      triaje: 'Medio',
      fechaIngreso: '2026-10-10',
      telefono: '998877665'
    };

    service.registrar(nuevo).subscribe(p => {
      expect(p.id).toBe(3);
      expect(p.triaje).toBe('Medio');
    });

    const req = httpTesting.expectOne(service.getUrl());
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevo);
    req.flush({ ...nuevo, id: 3 });
  });

  it('actualizar() debe enviar PUT al identificador especificado', () => {
    const editado = { ...mockPacientes[0], diagnostico: 'Hipertensión controlada' };

    service.actualizar(1, editado).subscribe(p => {
      expect(p.diagnostico).toBe('Hipertensión controlada');
    });

    const req = httpTesting.expectOne(`${service.getUrl()}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(editado);
  });

  it('eliminar() debe enviar peticion DELETE para dar de alta', () => {
    service.eliminar(2).subscribe();

    const req = httpTesting.expectOne(`${service.getUrl()}/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  it('filtrarPorTriaje() debe enviar GET con Query Param triaje', () => {
    service.filtrarPorTriaje('Critico').subscribe(res => {
      expect(res.length).toBe(1);
    });

    const req = httpTesting.expectOne(`${service.getUrl()}/triaje?triaje=Critico`);
    expect(req.request.method).toBe('GET');
    req.flush([mockPacientes[0]]);
  });
});
