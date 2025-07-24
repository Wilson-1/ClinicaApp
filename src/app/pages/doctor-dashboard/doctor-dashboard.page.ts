import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Cita } from 'src/app/models/cita.model';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonList, 
  IonItem, 
  IonLabel,
  IonButton,
  IonIcon,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonAvatar,
  IonRefresher,
  IonRefresherContent
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  calendarOutline, 
  timeOutline, 
  medicalOutline,
  statsChartOutline,
  refreshOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.page.html',
  styleUrls: ['./doctor-dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonChip,
    IonAvatar,
    IonRefresher,
    IonRefresherContent
  ]
})
export class DoctorDashboardPage {
  doctor = 'Dr. Pérez';
  citas: Cita[] = [];
  pacientes: string[] = [];
  
  // Nuevas propiedades para estadísticas
  citasHoy: number = 0;
  citasPendientes: number = 0;
  pacientesTotal: number = 0;
  
  constructor(private dataService: DataService) {
    addIcons({medicalOutline,calendarOutline,timeOutline,personOutline,chevronForwardOutline,statsChartOutline,refreshOutline});
  }

  ionViewWillEnter() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.citas = this.dataService.getCitasPorDoctor(this.doctor);
    this.pacientes = this.dataService.getPacientesDelDoctor(this.doctor);
    
    // Calcular estadísticas
    this.citasHoy = this.citas.length;
    this.citasPendientes = this.citas.filter(cita => cita.estado === 'pendiente').length;
    this.pacientesTotal = this.pacientes.length;
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.loadDashboardData();
      event.target.complete();
    }, 1000);
  }

  verDetalleCita(cita: Cita) {
    // Lógica para ver detalles de la cita
    console.log('Ver detalles de:', cita);
  }

  verPerfilPaciente(paciente: string) {
    // Lógica para ver perfil del paciente
    console.log('Ver perfil de:', paciente);
  }

  navegarAPacientes() {
    // Navegar a la lista completa de pacientes
  }

  getChipColor(estado: string): string {
    switch(estado) {
      case 'completada': return 'success';
      case 'confirmada': return 'primary';
      case 'pendiente': return 'warning';
      default: return 'medium';
    }
  }

  getEstadoText(estado: string): string {
    switch(estado) {
      case 'completada': return 'Completada';
      case 'confirmada': return 'Confirmada';
      case 'pendiente': return 'Pendiente';
      default: return 'Sin estado';
    }
  }
}