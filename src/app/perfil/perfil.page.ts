import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalEmailComponent } from './modalemail.component.'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  updateEmailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalController: ModalController
  ) {
    this.updateEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  logout() {
    console.log('Logging out...');
    // Implementa la lógica de logout si es necesario
    this.router.navigate(['/login']);
  }

  goToTabs() {
    this.router.navigate(['/tabs']);
  }

  async openUpdateEmailModal() {
    const modal = await this.modalController.create({
      component: ModalEmailComponent,
      componentProps: { currentEmail: this.updateEmailForm.get('email')?.value }
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        // Actualizar el email con los datos recibidos si es necesario
        const updatedEmail = data.data.newEmail;
        this.updateEmailForm.patchValue({ email: updatedEmail });
      }
    });

    return await modal.present();
  }

  updateEmail() {
    if (this.updateEmailForm.valid) {
      // Implementa la lógica de actualización del email aquí
      const updatedEmail = this.updateEmailForm.get('email')?.value;
      console.log('Updating email:', updatedEmail);
    }
  }
}
