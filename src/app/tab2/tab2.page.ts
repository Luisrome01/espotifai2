import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MusicPlayerService } from '../tab3/music-player.service'; // Importar el servicio compartido
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  searchTerm: string = '';
  searchResults: any[] = [];
  selectedGenre: string = 'rock'; // Valor por defecto
  selectedSong: any = null;

  // Datos de autenticación de Spotify
  clientId = '07ef288afade491db9f20b58d12e6e25';
  clientSecret = '643e1e120e144d24b6a3644be1fa5dc0';

  constructor(
    private http: HttpClient,
    private musicPlayerService: MusicPlayerService,
    private alertController: AlertController
  ) {}

  searchItems(event: any) {
    const searchTerm = event.target.value.trim();
    if (searchTerm !== '') {
      this.getAccessToken().subscribe(
        (token: any) => {
          if (token.access_token) {
            this.searchSongs(searchTerm, this.selectedGenre, token.access_token).subscribe(
              (data: any) => {
                this.searchResults = data.tracks.items;
              },
              (error) => {
                console.error('Error fetching search results', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error fetching access token', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }


  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      location.reload();
      event.detail.complete();
    }, 2000);
  }
  getAccessToken() {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http.post(tokenUrl, body.toString(), httpOptions);
  }

  searchSongs(searchTerm: string, genre: string, accessToken: string) {
    const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=10&market=US`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      }),
    };
    return this.http.get(url, httpOptions);
  }

  async playSong(song: any) {
    console.log('Playing song:', song);
    this.selectedSong = song;

    try {
      await this.musicPlayerService.setSong(song);
      await this.musicPlayerService.play();
    } catch (error) {
      console.error('Error playing song', error);
      await this.presentAlert('Error al reproducir la canción', 'Por favor, inténtalo de nuevo más tarde.');
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
}
