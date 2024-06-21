import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AlbumArtistDetailModalComponent } from '../album-artist-detail-modal/album-artist-detail-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  newAlbums: any[] = [];
  artists: any[] = [];
  artistIds: string = '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6';

  constructor(
    private spotifyService: SpotifyService,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getNewAlbums();
    this.getArtists();
  }

  getNewAlbums() {
    this.spotifyService.getNewReleases().subscribe(
      (data: any) => {
        this.newAlbums = data.albums.items.slice(0, 6); // Limitamos a 6 álbumes
      },
      (error) => {
        console.error('Error fetching new releases:', error);
        this.presentErrorToast('Error fetching new releases');
      }
    );
  }

  getArtists() {
    this.spotifyService.getArtists(this.artistIds).subscribe(
      (data: any) => {
        this.artists = data.artists;
      },
      (error) => {
        console.error('Error fetching artists:', error);
        this.presentErrorToast('Error fetching artists');
      }
    );
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  async openDetailModal(details: any, type: 'album' | 'artist') {
    const modal = await this.modalController.create({
      component: AlbumArtistDetailModalComponent,
      componentProps: {
        details: details,
        type: type
      }
    });
    return await modal.present();
  }

  openAlbum(album: any) {
    this.openDetailModal(album, 'album');
  }

  openArtist(artist: any) {
    this.openDetailModal(artist, 'artist');
  }
}
