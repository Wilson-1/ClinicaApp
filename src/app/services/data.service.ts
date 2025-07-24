import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private citas: Cita[] = [
    { 
      id: 1, 
      paciente: 'Wilson Criollo', 
      doctor: 'Dr. Pérez', 
      fecha: '2024-01-15', 
      motivo: 'Limpieza dental',
      estado: 'completada'
    },
    { 
      id: 2, 
      paciente: 'María García', 
      doctor: 'Dr. Pérez', 
      fecha: '2024-01-15', 
      motivo: 'Revisión general',
      estado: 'pendiente'
    },
    { 
      id: 3, 
      paciente: 'Juan López', 
      doctor: 'Dr. Pérez', 
      fecha: '2024-01-15', 
      motivo: 'Extracción',
      estado: 'pendiente'
    },
    { 
      id: 4, 
      paciente: 'Ana Martín', 
      doctor: 'Dr. Pérez', 
      fecha: '2024-01-16', 
      motivo: 'Endodoncia',
      estado: 'confirmada'
    },
    { 
      id: 5, 
      paciente: 'Carlos Ruiz', 
      doctor: 'Dr. Pérez', 
      fecha: '2024-01-16', 
      motivo: 'Ortodoncia',
      estado: 'pendiente'
    }
  ];

  private medicamentos = [
    { id: 1, paciente: 'Wilson Criollo', nombre: 'Ibuprofeno', dosis: '400mg', frecuencia: 'Cada 8 horas', doctor: 'Dr. Pérez' },
    { id: 2, paciente: 'Wilson Criollo', nombre: 'Amoxicilina', dosis: '500mg', frecuencia: 'Cada 12 horas', doctor: 'Dr. García' },
    { id: 3, paciente: 'Juan López', nombre: 'Paracetamol', dosis: '500mg', frecuencia: 'Cada 6 horas', doctor: 'Dr. Pérez' }
  ];

  constructor() { }

  getCitasPorDoctor(doctor: string): Cita[] {
    return this.citas.filter(cita => cita.doctor === doctor);
  }

  getCitasPorPaciente(paciente: string): Cita[] {
    return this.citas.filter(cita => cita.paciente === paciente);
  }

  getPacientesDelDoctor(doctor: string): string[] {
    const citas = this.getCitasPorDoctor(doctor);
    const pacientesUnicos = [...new Set(citas.map(cita => cita.paciente))];
    return pacientesUnicos;
  }

  getMedicamentosDelPaciente(paciente: string) {
    return this.medicamentos.filter(medicamento => medicamento.paciente === paciente);
  }
}
