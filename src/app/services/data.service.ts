import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  citas: Cita[] = [
    { id: 1, paciente: 'Wilson Criollo', doctor: 'Dr. Pérez', fecha: '2025-07-22 10:00', motivo: 'Consulta General' },
    { id: 2, paciente: 'Juan López', doctor: 'Dr. Pérez', fecha: '2025-07-22 11:00', motivo: 'Chequeo' },
    { id: 3, paciente: 'Wilson Criollo', doctor: 'Dr. García', fecha: '2025-07-25 09:00', motivo: 'Control mensual' }
  ];

  getCitasPorDoctor(doctor: string) {
    return this.citas.filter(c => c.doctor === doctor);
  }

  getCitasPorPaciente(paciente: string) {
    return this.citas.filter(c => c.paciente === paciente);
  }
}
