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
  loginError: string = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      console.log('Email:', email);
      console.log('Contraseña:', password);
  
      fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          console.log('Token de sesión:', data.token);
          localStorage.setItem('authToken', data.token); // Guardar el token en localStorage
          this.email = email;
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        } else {
          this.loginError = 'Credenciales inválidas';
        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        this.loginError = 'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde.';
      });
    } else {
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
