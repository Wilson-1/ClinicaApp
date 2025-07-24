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
  refreshOutline,
  chevronForwardOutline,
  medicalSharp, // Usar medicalSharp en lugar de pillOutline
  heartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-paciente-dashboard',
  templateUrl: './paciente-dashboard.page.html',
  styleUrls: ['./paciente-dashboard.page.scss'],
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
export class PacienteDashboardPage {
  paciente = 'Wilson Criollo';
  citas: Cita[] = [];
  medicamentos: any[] = [];
  
  // Nuevas propiedades para estadísticas
  citasTotal: number = 0;
  medicamentosTotal: number = 0;
  proximasCitas: number = 0;

  constructor(private dataService: DataService) {
    addIcons({
      personOutline,
      calendarOutline,
      timeOutline,
      medicalOutline,
      refreshOutline,
      chevronForwardOutline,
      medicalSharp, // Corregido: usar medicalSharp
      heartOutline
    });
  }

  ionViewWillEnter() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.citas = this.dataService.getCitasPorPaciente(this.paciente);
    this.medicamentos = this.dataService.getMedicamentosDelPaciente(this.paciente);
    
    // Calcular estadísticas
    this.citasTotal = this.citas.length;
    this.medicamentosTotal = this.medicamentos.length;
    this.proximasCitas = this.citas.filter(cita => cita.estado === 'pendiente' || cita.estado === 'confirmada').length;
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

  verDetallesMedicamento(medicamento: any) {
    // Lógica para ver detalles del medicamento
    console.log('Ver detalles de:', medicamento);
  }

  navegarADoctor() {
    // Navegar al dashboard del doctor
  }

  getChipColor(estado: string | undefined): string {
    if (!estado) return 'medium';
    switch(estado) {
      case 'completada': return 'success';
      case 'confirmada': return 'primary';
      case 'pendiente': return 'warning';
      default: return 'medium';
    }
  }

  getEstadoText(estado: string | undefined): string {
    if (!estado) return 'Sin estado';
    switch(estado) {
      case 'completada': return 'Completada';
      case 'confirmada': return 'Confirmada';
      case 'pendiente': return 'Pendiente';
      default: return 'Sin estado';
    }
  }

  getMedicamentoColor(index: number): string {
    const colors = ['primary', 'secondary', 'tertiary', 'success'];
    return colors[index % colors.length];
  }
}