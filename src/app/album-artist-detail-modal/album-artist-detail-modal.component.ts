import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SpotifyService } from '../Home/spotify.service';

@Component({
  selector: 'app-album-artist-detail-modal',
  templateUrl: './album-artist-detail-modal.component.html',
  styleUrls: ['./album-artist-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumArtistDetailModalComponent implements OnInit {
  @Input() details: any = null;
  @Input() type: 'album' | 'artist' = 'album';
  tracks: any[] = [];

  colores = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
  color: string | null = null;
  previousColor: string = '';

  constructor(
    private modalController: ModalController,
    private spotifyService: SpotifyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.type === 'album' && this.details) {
      this.loadAlbumTracks(this.details.id);
      this.setRandomColor();
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
  loadAlbumTracks(albumId: string) {
    this.spotifyService.getAlbumTracks(albumId).subscribe(
      (data) => {
        this.tracks = data.items;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error fetching album tracks:', error);
      }
    );
  }
  
  setRandomColor() {
    const randomIndex = this.getRandomIndex(this.colores);
    this.color = this.colores[randomIndex];
    this.previousColor = this.color; // Actualiza el color anterior
    this.cdr.markForCheck();
  }

  getRandomIndex(arr: any[]): number {
    let currentIndex: number;

    do {
      currentIndex = Math.floor(Math.random() * arr.length);
    } while (this.previousColor === this.colores[currentIndex]);

    return currentIndex;
  }
}