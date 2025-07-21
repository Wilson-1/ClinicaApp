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
    IonList,
    IonItem,
    IonLabel,
    IonButton
  ]
})
export class DoctorDashboardPage {

  citas: Cita[] = [];

  constructor(private dataService: DataService) { }

  ionViewWillEnter() {
    this.citas = this.dataService.getCitasPorDoctor('Dr. Pérez');
  }

}
