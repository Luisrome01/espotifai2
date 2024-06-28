import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-modalemail',
  templateUrl: './modalemail.component.html',
  styleUrls: ['./modalemail.component.scss']
})
export class ModalEmailComponent implements OnInit {
  @Input() currentEmail!: string;
  updateEmailForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.initializeUpdateEmailForm();
  }


  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      location.reload();
      event.detail.complete();
    }, 2000);
  }

  initializeUpdateEmailForm() {
    this.updateEmailForm = this.formBuilder.group({
      email: [this.currentEmail, [Validators.required, Validators.email]]
    });
  }

  updateEmail() {
    if (this.updateEmailForm.valid) {
      const newEmail = this.updateEmailForm.get('email')?.value;
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        console.error('No hay token de autenticación disponible.');
        return;
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      });

      const requestBody = { newEmail };

      this.http.put('https://backend-spotify-c0gn.onrender.com/api/users/updateEmail', requestBody, { headers })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Error desconocido al actualizar el email.';

            if (error.status === 404) {
              errorMessage = 'No se encontró la URL de actualización del email en el servidor.';
            } else {
              errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
            }

            console.error(errorMessage);
            this.presentErrorAlert(errorMessage); // Mostrar alerta de error al usuario
            return throwError(errorMessage);
          })
        )
        .subscribe(
          (response) => {
            console.log('Email actualizado correctamente:', response);
            // Actualizar userEmail en localStorage y en el formulario actual
            localStorage.setItem('userEmail', newEmail);
            this.dismissModal();
          },
          (error) => {
            console.error('Error al actualizar email:', error);
            // Puedes manejar aquí cualquier lógica adicional de error si es necesario
          }
        );
    }
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
