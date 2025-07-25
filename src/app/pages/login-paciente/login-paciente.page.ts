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
import { personOutline, heartOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login-paciente',
  templateUrl: './login-paciente.page.html',
  styleUrls: ['./login-paciente.page.scss'],
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
export class LoginPacientePage {
  // Propiedades del formulario
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  // Validaciones
  emailError: string = '';
  passwordError: string = '';
  isFormValid: boolean = false;

  // Pacientes válidos (simulando base de datos)
  private validPatients = [
    { email: 'paciente@gmail.com', password: '123456', name: 'Ana López', cedula: '12345678' },
    { email: 'juan.perez@gmail.com', password: '123456', name: 'Juan Pérez', cedula: '87654321' },
    { email: 'maria.garcia@gmail.com', password: 'maria123', name: 'María García', cedula: '11223344' }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    addIcons({
      personOutline,
      heartOutline,
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
      const patient = this.validPatients.find(
        p => p.email === this.email && p.password === this.password
      );

      await loading.dismiss();
      this.isLoading = false;

      if (patient) {
        // Login exitoso
        await this.showToast(`¡Bienvenido/a ${patient.name}!`, 'success');
        
        // Guardar datos del paciente en localStorage
        localStorage.setItem('patientData', JSON.stringify({
          email: patient.email,
          name: patient.name,
          cedula: patient.cedula,
          loginTime: new Date().toISOString()
        }));

        // Navegar al dashboard
        this.router.navigate(['/paciente-dashboard']);
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
      message: 'Ingresa tu email para recibir instrucciones de recuperación.',
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

  // Ir a registro
  async goToRegister() {
    const alert = await this.alertController.create({
      header: 'Registro de Paciente',
      message: 'Para registrarte como paciente, por favor acércate a la clínica o contacta al personal administrativo.',
      buttons: [
        {
          text: 'Entendido',
          role: 'cancel'
        },
        {
          text: 'Contactar',
          handler: () => {
            this.showToast('Teléfono: (123) 456-7890', 'primary');
          }
        }
      ]
    });
    await alert.present();
  }

  // Validación en tiempo real del formulario
  onEmailInput() {
    this.validateEmail();
  }

  onPasswordInput() {
    this.validatePassword();
  }
}
