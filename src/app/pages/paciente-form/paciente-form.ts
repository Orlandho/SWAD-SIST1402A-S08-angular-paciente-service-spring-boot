import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Paciente, NivelTriaje } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './paciente-form.html',
  styleUrls: ['./paciente-form.scss']
})
export class PacienteForm implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pacienteService = inject(PacienteService);

  id?: number;
  editando = false;
  mensaje = '';
  guardando = false;

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    edad: [30, [Validators.required, Validators.min(0), Validators.max(120)]],
    diagnostico: ['', [Validators.required, Validators.minLength(5)]],
    triaje: ['Medio' as NivelTriaje, [Validators.required]],
    telefono: ['987654321', [Validators.required]],
    activo: [true],
    fechaIngreso: [new Date().toISOString().substring(0, 10)]
  });

  ngOnInit(): void {
    const valor = this.route.snapshot.paramMap.get('id');
    if (valor) {
      this.id = Number(valor);
      this.editando = true;
      this.pacienteService.buscarPorId(this.id).subscribe({
        next: p => {
          this.form.patchValue({
            nombre: p.nombre,
            dni: p.dni,
            edad: p.edad,
            diagnostico: p.diagnostico,
            triaje: p.triaje,
            telefono: p.telefono,
            activo: p.activo,
            fechaIngreso: p.fechaIngreso
          });
        },
        error: err => {
          this.mensaje = `Error al recuperar datos del paciente (HTTP ${err?.status ?? '404'})`;
        }
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.mensaje = '';

    const paciente = this.form.getRawValue() as Paciente;

    const peticion = this.editando && this.id
      ? this.pacienteService.actualizar(this.id, paciente)
      : this.pacienteService.registrar(paciente);

    peticion.subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/pacientes']);
      },
      error: err => {
        this.guardando = false;
        this.mensaje = `Error al guardar en el servidor: HTTP ${err?.status ?? 'Fallo'}`;
      }
    });
  }
}
