import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Paciente, NivelTriaje } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paciente-list.html',
  styleUrls: ['./paciente-list.scss']
})
export class PacienteList implements OnInit {

  pacientes = signal<Paciente[]>([]);
  cargando = signal(false);
  error = signal('');
  filtroTriaje = signal<string>('TODOS');

  totalPacientes = computed(() => this.pacientes().length);
  totalCriticos = computed(() => this.pacientes().filter(p => p.triaje === 'Critico').length);
  totalMedios = computed(() => this.pacientes().filter(p => p.triaje === 'Medio').length);
  totalBajos = computed(() => this.pacientes().filter(p => p.triaje === 'Bajo').length);

  pacientesFiltrados = computed(() => {
    const filtro = this.filtroTriaje();
    if (filtro === 'TODOS') {
      return this.pacientes();
    }
    return this.pacientes().filter(p => p.triaje === filtro);
  });

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.cargando.set(true);
    this.error.set('');

    this.pacienteService.listar().subscribe({
      next: (datos: Paciente[]) => {
        this.pacientes.set(datos);
        this.cargando.set(false);
      },
      error: (err: any) => {
        const status = err?.status ?? 'Conexión';
        this.error.set(`Error HTTP ${status}: No se pudo obtener la lista de pacientes desde ${this.pacienteService.getUrl()}`);
        this.cargando.set(false);
      }
    });
  }

  seleccionarFiltro(nivel: string): void {
    this.filtroTriaje.set(nivel);
  }

  darDeAlta(id: number | undefined): void {
    if (!id) return;
    if (!confirm(`¿Confirma dar de alta médica y retirar al paciente #${id}?`)) return;

    this.cargando.set(true);
    this.pacienteService.eliminar(id).subscribe({
      next: () => {
        this.cargarPacientes();
      },
      error: (err: any) => {
        this.error.set(`Fallo al dar de alta al paciente: HTTP ${err?.status ?? 'Error'}`);
        this.cargando.set(false);
      }
    });
  }
}
