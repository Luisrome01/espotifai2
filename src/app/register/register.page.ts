import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[a-zA-Z ]*')
      ]],
      lastname: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[a-zA-Z ]*')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.router.navigate(['/login']);
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to display errors
      this.markFormGroupTouched(this.registerForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      location.reload();
      event.detail.complete();
    }, 2000);
  }

  // Custom validator to check if passwords match
  passwordMatchValidator = (form: FormGroup) => {
    const password = form.get('password')!;
    const confirmPassword = form.get('confirmPassword')!;
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  };
}
