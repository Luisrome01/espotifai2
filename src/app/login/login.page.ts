import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Username:', this.loginForm.value.username);
      console.log('Password:', this.loginForm.value.password);

      // Redirige a la página de tabs
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      // Marca todos los controles como tocados para mostrar los mensajes de error
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      location.reload();
      event.detail.complete();
    }, 2000);
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
