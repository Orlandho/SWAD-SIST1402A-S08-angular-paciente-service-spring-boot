import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente, NivelTriaje } from '../models/paciente.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  public static readonly DEFAULT_URL = 'http://localhost:8080/api/pacientes';
  private readonly STORAGE_KEY = 'swad_sist1402a_api_url';

  private apiUrl: string;

  constructor(private http: HttpClient) {
    const guardada = typeof window !== 'undefined' ? localStorage.getItem(this.STORAGE_KEY) : null;
    this.apiUrl = guardada || environment.apiUrl || PacienteService.DEFAULT_URL;
  }

  getUrl(): string {
    return this.apiUrl;
  }

  setUrl(url: string): void {
    const limpia = url.trim();
    if (limpia) {
      this.apiUrl = limpia;
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, limpia);
      }
    }
  }

  restablecerUrlPredeterminada(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.apiUrl = environment.apiUrl || PacienteService.DEFAULT_URL;
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
