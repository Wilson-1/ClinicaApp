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
  IonList, 
  IonItem, 
  IonLabel, 
  IonButton 
} from "@ionic/angular/standalone";

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
    IonList,
    IonItem,
    IonLabel,
    IonButton
  ]
})
export class PacienteDashboardPage {

  citas: Cita[] = [];

  constructor(private dataService: DataService) { }

  ionViewWillEnter() {
    this.citas = this.dataService.getCitasPorPaciente('Wilson Criollo');
  }

}
