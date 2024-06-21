import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  constructor(private router: Router) {}

  logout() {
    
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }
  goToTabs() {
    this.router.navigate(['/tabs']);
  }
}

