import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonIcon,
  IonItem,
  IonNote,
  AlertController,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { medicalOutline, personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.page.html',
  styleUrls: ['./login-doctor.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonIcon,
    IonItem,
    IonNote
  ]
})
export class LoginDoctorPage {
  // Propiedades del formulario
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  // Validaciones
  emailError: string = '';
  passwordError: string = '';
  isFormValid: boolean = false;

  // Doctores válidos (simulando base de datos)
  private validDoctors = [
    { email: 'doctor@gmail.com', password: '123456', name: 'Dr. Juan Pérez' },
    { email: 'doctora@gmail.com', password: '123456', name: 'Dra. María García' },
    { email: 'admin@gmail.com', password: 'admin123', name: 'Dr. Admin' }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    addIcons({
      medicalOutline,
      personOutline,
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline
    });
  }

  // Validar email en tiempo real
  validateEmail() {
    this.emailError = '';
    
    if (!this.email) {
      this.emailError = 'El email es requerido';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = 'Email no válido';
    } else if (!this.email.includes('@gmail.com')) {
      this.emailError = 'Debe ser un email de Gmail';
    }
    
    this.checkFormValidity();
  }

  // Validar contraseña en tiempo real
  validatePassword() {
    this.passwordError = '';
    
    if (!this.password) {
      this.passwordError = 'La contraseña es requerida';
    } else if (this.password.length < 6) {
      this.passwordError = 'Mínimo 6 caracteres';
    }
    
    this.checkFormValidity();
  }

  // Verificar si el formulario es válido
  checkFormValidity() {
    this.isFormValid = 
      this.email.length > 0 && 
      this.password.length > 0 && 
      !this.emailError && 
      !this.passwordError &&
      this.isValidEmail(this.email) &&
      this.email.includes('@gmail.com');
  }

  // Validar formato de email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Alternar visibilidad de contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Proceso de login
  async login() {
    if (!this.isFormValid) {
      await this.showToast('Por favor, completa todos los campos correctamente', 'warning');
      return;
    }

    // Mostrar loading
    const loading = await this.loadingController.create({
      message: 'Verificando credenciales...',
      duration: 2000
    });
    await loading.present();

    this.isLoading = true;

    // Simular delay de autenticación
    setTimeout(async () => {
      const doctor = this.validDoctors.find(
        d => d.email === this.email && d.password === this.password
      );

      await loading.dismiss();
      this.isLoading = false;

      if (doctor) {
        // Login exitoso
        await this.showToast(`¡Bienvenido ${doctor.name}!`, 'success');
        
        // Guardar datos del doctor en localStorage (opcional)
        localStorage.setItem('doctorData', JSON.stringify({
          email: doctor.email,
          name: doctor.name,
          loginTime: new Date().toISOString()
        }));

        // Navegar al dashboard
        this.router.navigate(['/doctor-dashboard']);
      } else {
        // Login fallido
        await this.showAlert(
          'Error de Autenticación',
          'Email o contraseña incorrectos. Por favor, verifica tus credenciales.'
        );
      }
    }, 2000);
  }

  // Mostrar alerta
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  // Mostrar toast
  private async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  // Recuperar contraseña
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperar Contraseña',
      message: 'Contacta al administrador del sistema para recuperar tu contraseña.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Tu email de Gmail',
          value: this.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: (data) => {
            if (data.email && this.isValidEmail(data.email)) {
              this.showToast('Se ha enviado un enlace de recuperación a tu email', 'success');
              return true;
            } else {
              this.showToast('Por favor, ingresa un email válido', 'danger');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Ir a registro (futuro)
  goToRegister() {
    this.showToast('Funcionalidad de registro próximamente', 'medium');
  }

  // Validación en tiempo real del formulario
  onEmailInput() {
    this.validateEmail();
  }

  onPasswordInput() {
    this.validatePassword();
  }
}