import { Routes } from '@angular/router';
import { PacienteList } from './pages/paciente-list/paciente-list';
import { PacienteForm } from './pages/paciente-form/paciente-form';

export const routes: Routes = [
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' },
  { path: 'pacientes', component: PacienteList },
  { path: 'pacientes/nuevo', component: PacienteForm },
  { path: 'pacientes/editar/:id', component: PacienteForm },
  { path: '**', redirectTo: 'pacientes' }
];
