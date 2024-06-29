import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MusicPlayerService } from '../tab3/music-player.service'; // Importar el servicio compartido
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.page.html',
  styleUrls: ['./playlist-detail.page.scss'],
})
export class PlaylistDetailPage implements OnInit {
  playlist: any = { name: '', songs: [] };

  // Datos de autenticación de Spotify (reutilizando del Tab2)
  clientId = '07ef288afade491db9f20b58d12e6e25';
  clientSecret = '643e1e120e144d24b6a3644be1fa5dc0';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private musicPlayerService: MusicPlayerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.playlist = navigation.extras.state['playlist'];
      // Llamar método para cargar las canciones de la playlist
      this.loadPlaylistSongs(this.playlist.id);
    }
  }

  loadPlaylistSongs(playlistId: string) {
    this.getAccessToken().subscribe(
      (token: any) => {
        if (token.access_token) {
          this.getPlaylistTracks(playlistId, token.access_token).subscribe(
            (data: any) => {
              this.playlist.songs = data.items.map((item: any) => ({
                id: item.track.id,
                name: item.track.name,
                artists: item.track.artists.map((artist: any) => artist.name).join(', ')
              }));
            },
            (error) => {
              console.error('Error fetching playlist tracks', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching access token', error);
      }
    );
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

  getPlaylistTracks(playlistId: string, accessToken: string) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      }),
    };
    return this.http.get(url, httpOptions);
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
