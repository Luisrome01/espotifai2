import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modaldelete',
  templateUrl: './modaldelete.component.html',
  styleUrls: ['./modaldelete.component.scss'],
})
export class ModalDeleteComponent {
  deleteAccountForm: FormGroup;
  userEmail: string | null = '';

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,
    private http: HttpClient
  ) {
    this.deleteAccountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.userEmail = localStorage.getItem('userEmail') || '';
  }

  async verifyCredentials() {
    if (this.deleteAccountForm.valid) {
      const { email } = this.deleteAccountForm.value;

      if (email === this.userEmail) {
        // Email coincidente, proceder con la eliminación del usuario
        this.deleteAccount(email);
      } else {
        // Mostrar mensaje de error de credenciales inválidas
        this.showErrorAlert('Invalid credentials. Please try again.');
      }
    } else {
      // Mostrar mensaje de error de formulario inválido
      this.showErrorAlert('Please enter a valid email.');
    }
  }

  async deleteAccount(email: string) {
    try {
      // Obtener el token de localStorage
      const authToken = localStorage.getItem('authToken');

      // Verificar si existe el token
      if (!authToken) {
        this.showErrorAlert('Token not found. Please login again.');
        return;
      }

      // Configurar los headers con el token y el tipo de contenido
      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      // Realizar la solicitud DELETE al backend para eliminar el usuario
      await this.http.delete('https://backend-spotify-c0gn.onrender.com/api/users/deleteUser', { headers, body: { email } }).toPromise();

      // Usuario eliminado exitosamente
      this.showSuccessAlert('User deleted successfully!');
      this.modalController.dismiss({ success: true });
    } catch (error) {
      // Capturar errores específicos
      if (error instanceof HttpErrorResponse) {
        // Error de HTTP
        if (error.status === 401) {
          this.showErrorAlert('Unauthorized. Please check your credentials.');
        } else if (error.status === 404) {
          this.showErrorAlert('User not found. Please try again.');
        } else {
          this.showErrorAlert(`HTTP Error: ${error.status}. Please try again later.`);
        }
      } else {
        // Otros errores
        this.showErrorAlert('Error deleting account. Please try again later.');
      }
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Success',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
