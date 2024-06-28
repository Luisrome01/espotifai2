import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-modalupdatepassword',
  templateUrl: './modalupdatepassword.component.html',
  styleUrls: ['./modalupdatepassword.component.scss'],
})
export class ModalupdatepasswordComponent implements OnInit {
  updatePasswordForm!: FormGroup;
  passwordError: boolean = false;
  currentPasswordType: string = 'password';
  newPasswordType: string = 'password';
  confirmPasswordType: string = 'password';
  currentPasswordIcon: string = 'eye-off';
  newPasswordIcon: string = 'eye-off';
  confirmPasswordIcon: string = 'eye-off';

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.updatePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  checkCurrentPassword() {
    const currentPassword = this.updatePasswordForm.get('currentPassword')?.value;
    const storedPassword = localStorage.getItem('password');

    if (currentPassword !== storedPassword) {
      this.updatePasswordForm.get('currentPassword')?.setErrors({ incorrectPassword: true });
    } else {
      this.updatePasswordForm.get('currentPassword')?.setErrors(null);
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async onSubmit() {
    if (this.updatePasswordForm.invalid) {
      return;
    }

    const currentPassword = this.updatePasswordForm.value.currentPassword;
    const newPassword = this.updatePasswordForm.value.newPassword;
    const confirmPassword = this.updatePasswordForm.value.confirmPassword;
    const authToken = localStorage.getItem('authToken');

    const response = await fetch('https://backend-spotify-c0gn.onrender.com/api/users/updatePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
    });

    const result = await response.json();
    if (response.ok) {
      this.presentAlert('Success', 'Password updated successfully.');
      this.dismissModal();
    } else {
      console.error('Error updating password', result);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  togglePasswordVisibility(field: string) {
    switch (field) {
      case 'currentPassword':
        this.currentPasswordType = this.currentPasswordType === 'password' ? 'text' : 'password';
        this.currentPasswordIcon = this.currentPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
        break;
      case 'newPassword':
        this.newPasswordType = this.newPasswordType === 'password' ? 'text' : 'password';
        this.newPasswordIcon = this.newPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
        break;
      case 'confirmPassword':
        this.confirmPasswordType = this.confirmPasswordType === 'password' ? 'text' : 'password';
        this.confirmPasswordIcon = this.confirmPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
        break;
    }
  }
}
