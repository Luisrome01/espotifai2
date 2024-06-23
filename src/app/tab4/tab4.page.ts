import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  playlists: any[] = [];

  constructor(private alertController: AlertController) {}

  showDeleteConfirmation(index: number) {
    this.alertController.create({
      header: 'Eliminar playlist',
      message: '¿Estás seguro de que quieres eliminar esta playlist?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deletePlaylist(index);
          }
        }
      ]
    }).then(alert => alert.present());
  }

  deletePlaylist(index: number) {
    // Lógica para eliminar la playlist
    this.playlists.splice(index, 1);
  }

  editPlaylistTitle(index: number) {
    // Lógica para editar el título de la playlist
    this.playlists[index].isEditing = true;
  }

  savePlaylistTitle(index: number) {
    // Lógica para guardar el título de la playlist
    this.playlists[index].isEditing = false;
  }

  createPlaylist() {
    // Lógica para crear una nueva playlist
    this.playlists.push({ title: 'Nueva playlist', isEditing: false });
  }
}