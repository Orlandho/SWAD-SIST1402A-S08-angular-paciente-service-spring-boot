export type NivelTriaje = 'Bajo' | 'Medio' | 'Critico';

export interface Paciente {
  id?: number;
  nombre: string;
  edad: number;
  dni: string;
  diagnostico: string;
  activo: boolean;
  triaje: NivelTriaje;
  fechaIngreso: string;
  telefono: string;
  alergias?: string[];
}
