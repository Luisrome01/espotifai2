/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Datos de la aplicación registrada en Spotify
  clientId = 'TU_CLIENT_ID';
  clientSecret = 'TU_CLIENT_SECRET';
  redirectUri = 'http://localhost:8888/callback'; // Debes configurar este valor en la consola de Spotify

  constructor(private http: HttpClient) {}

  // Método para obtener el token de acceso utilizando el flujo de autorización de Spotify
  getAccessToken(): Observable<any> {
    const authorizationCode = this.getAuthorizationCode();
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const body = `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${this.redirectUri}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
      }),
    };

    return this.http.post(tokenUrl, body, httpOptions);
  }

  // Método para obtener el código de autorización desde la URL
  private getAuthorizationCode(): string {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }
}
*/