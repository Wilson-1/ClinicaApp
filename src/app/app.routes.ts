import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'doctor-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'doctor-dashboard',
    loadComponent: () => import('./pages/doctor-dashboard/doctor-dashboard.page').then( m => m.DoctorDashboardPage)
  },
  {
    path: 'paciente-dashboard',
    loadComponent: () => import('./pages/paciente-dashboard/paciente-dashboard.page').then( m => m.PacienteDashboardPage)
  },
];
