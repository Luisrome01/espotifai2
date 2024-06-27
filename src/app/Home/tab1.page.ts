import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AlbumArtistDetailModalComponent } from '../album-artist-detail-modal/album-artist-detail-modal.component';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  newAlbums: any[] = [];
  artists: any[] = [];
  currentAlbumOffset: number = 0;
  currentArtistOffset: number = 0;
  limit: number = 6; 
  allArtistsLoaded: boolean = false;
  allAlbumsLoaded: boolean = false;

  constructor(
    private spotifyService: SpotifyService,
    private toastController: ToastController,
    private modalController: ModalController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.getNewAlbums();
    this.getArtists();
  }

  getNewAlbums(event?: any) {
    if (this.allAlbumsLoaded) {
      if (event) {
        event.target.complete();
      }
      return;
    }

    this.spotifyService.getNewReleases(this.currentAlbumOffset, this.limit).subscribe(
      (data: any) => {
        this.newAlbums = this.newAlbums.concat(data.albums.items);
        this.currentAlbumOffset += this.limit;
        if (data.albums.items.length < this.limit) {
          this.allAlbumsLoaded = true;
        }
        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.error('Error fetching new releases:', error);
        this.presentErrorToast('Error fetching new releases');
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  getArtists(event?: any) {
    if (this.allArtistsLoaded) {
      if (event) {
        event.target.complete();
      }
      return;
    }

    this.spotifyService.searchArtists('a', this.currentArtistOffset, this.limit).subscribe(
      (data: any) => {
        this.artists = this.artists.concat(data.artists.items);
        this.currentArtistOffset += this.limit;
        if (data.artists.items.length < this.limit) {
          this.allArtistsLoaded = true;
        }
        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.error('Error fetching artists:', error);
        this.presentErrorToast('Error fetching artists');
        if (event) {
          event.target.complete();
        }
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

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      location.reload();
      event.detail.complete();
    }, 2000);
  }

  goToProfile() {
    this.navController.navigateForward('/perfil', {
      animated: true,
      animationDirection: 'back' 
    });
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

  loadData(event: any) {
    this.getNewAlbums(event);
    this.getArtists(event);
  }
}



