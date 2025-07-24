export interface Cita {
  id: number;
  paciente: string;
  doctor: string;
  fecha: string;
  motivo: string;
  estado?: string; // Agregar esta propiedad opcional
}