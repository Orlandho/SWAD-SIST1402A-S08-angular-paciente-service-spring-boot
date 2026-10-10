import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  apiUrlEdit = '';
  editandoUrl = false;

  readonly DEFAULT_URL = PacienteService.DEFAULT_URL;

  constructor(public pacienteService: PacienteService) {
    this.apiUrlEdit = this.pacienteService.getUrl();
  }

  toggleEditUrl(): void {
    this.editandoUrl = !this.editandoUrl;
    if (this.editandoUrl) {
      this.apiUrlEdit = this.pacienteService.getUrl();
    }
  }

  seleccionarPreset(url: string): void {
    this.apiUrlEdit = url;
    this.guardarUrl();
  }

  guardarUrl(): void {
    if (this.apiUrlEdit.trim()) {
      this.pacienteService.setUrl(this.apiUrlEdit.trim());
      this.editandoUrl = false;
      window.location.reload();
    }
  }

  restablecerPredeterminada(): void {
    this.pacienteService.restablecerUrlPredeterminada();
    this.apiUrlEdit = this.pacienteService.getUrl();
    this.editandoUrl = false;
    window.location.reload();
  }
}
