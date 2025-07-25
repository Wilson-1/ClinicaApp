import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login-doctor',
    loadComponent: () => import('./pages/login-doctor/login-doctor.page').then( m => m.LoginDoctorPage)
  },
  {
    path: 'doctor-dashboard',
    loadComponent: () => import('./pages/doctor-dashboard/doctor-dashboard.page').then( m => m.DoctorDashboardPage)
  },
  {
    path: 'paciente-dashboard',
    loadComponent: () => import('./pages/paciente-dashboard/paciente-dashboard.page').then( m => m.PacienteDashboardPage)
  },
  {
    path: 'login-paciente',
    loadComponent: () => import('./pages/login-paciente/login-paciente.page').then( m => m.LoginPacientePage)
  },
];