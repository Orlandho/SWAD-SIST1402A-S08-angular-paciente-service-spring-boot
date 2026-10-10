import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente, NivelTriaje } from '../models/paciente.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = environment.apiUrl || 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient) {}

  getUrl(): string {
    return this.apiUrl;
  }

  setUrl(url: string): void {
    this.apiUrl = url;
  }

  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  registrar(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  actualizar(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filtrarPorTriaje(triaje: NivelTriaje): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/triaje`, {
      params: { triaje }
    });
  }
}
