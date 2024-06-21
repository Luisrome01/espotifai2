import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SpotifyService } from '../Home/spotify.service'; // Asegúrate de importar tu servicio de Spotify aquí

@Component({
  selector: 'app-album-artist-detail-modal',
  templateUrl: './album-artist-detail-modal.component.html',
  styleUrls: ['./album-artist-detail-modal.component.scss'],
})
export class AlbumArtistDetailModalComponent implements OnInit {
  @Input() details: any = null;
  @Input() type: 'album' | 'artist' = 'album';
  tracks: any[] = []; // Arreglo para almacenar las canciones del álbum

  constructor(
    private modalController: ModalController,
    private spotifyService: SpotifyService // Inyecta el servicio de Spotify
  ) {}

  ngOnInit() {
    if (this.type === 'album' && this.details) {
      this.loadAlbumTracks(this.details.id); // Carga las canciones del álbum si es un detalle de álbum
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  // Método para cargar las canciones de un álbum
  loadAlbumTracks(albumId: string) {
    this.spotifyService.getAlbumTracks(albumId).subscribe(
      (data) => {
        this.tracks = data.items; // Asigna las canciones del álbum
      },
      (error) => {
        console.error('Error fetching album tracks:', error);
      }
    );
  }
}
