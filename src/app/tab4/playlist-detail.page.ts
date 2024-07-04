import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.page.html',
  styleUrls: ['./playlist-detail.page.scss'],
})
export class PlaylistDetailPage implements OnInit, OnDestroy {
  playlist: any = { name: '', songs: [] };
  clientId = '07ef288afade491db9f20b58d12e6e25';
  clientSecret = '643e1e120e144d24b6a3644be1fa5dc0';
  private accessTokenSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.playlist = navigation.extras.state['playlist'];
      console.log('Playlist data:', this.playlist);
      this.loadPlaylistSongs(this.playlist.songs);
    }
  }

  ngOnDestroy() {
    if (this.accessTokenSubscription) {
      this.accessTokenSubscription.unsubscribe();
    }
  }

  loadPlaylistSongs(songIds: string[]) {
    console.log('Song IDs:', songIds);

    this.getAccessToken().subscribe(
      (token: any) => {
        if (token.access_token) {
          this.loadSongsDetails(songIds, token.access_token);
        }
      },
      (error) => {
        console.error('Error fetching access token', error);
      }
    );
  }

  getAccessToken(): Observable<any> {
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

  loadSongsDetails(songIds: string[], accessToken: string) {
    const url = `https://api.spotify.com/v1/tracks`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      }),
    };

    const requests = songIds.map(songId => {
      return this.http.get<any>(`${url}/${songId}`, httpOptions).pipe(
        map(song => ({
          id: song.id,
          name: song.name,
          artists: song.artists.map((artist: any) => artist.name).join(', '),
          album: song.album.name,
          imageUrl: song.album.images[0]?.url,
        }))
      );
    });

    forkJoin(requests).subscribe(
      (songs) => {
        this.playlist.songs = songs; // Replace the entire array with the fetched songs
      },
      (error) => {
        console.error('Error fetching song details', error);
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
