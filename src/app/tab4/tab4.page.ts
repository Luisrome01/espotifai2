import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  playlists: any[] = [];

  constructor(private alertController: AlertController, private http: HttpClient, private router: Router) {}

  ionViewWillEnter() {
    this.loadPlaylists();
  }

  loadPlaylists() {
    const apiUrl = 'https://backend-spotify-c0gn.onrender.com/api/playlist/getAllPlaylists';
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    this.http.get<any>(apiUrl, { headers }).subscribe(
      data => {
        if (data && data.playlists) {
          this.playlists = data.playlists;
        } else {
          console.error('Invalid response format', data);
        }
      },
      error => {
        console.error('Error fetching playlists', error);
      }
    );
  }
  showDeleteConfirmation(index: number) {
    const playlistId = this.playlists[index]._id; // Obtener el ID de la playlist
    const authToken = localStorage.getItem('authToken');
    const userId = authToken ? JSON.parse(atob(authToken.split('.')[1])).userId : null; // Obtener userId del authToken
  
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
            this.deletePlaylist(index, playlistId, userId); // Pasar playlistId y userId al método deletePlaylist
          }
        }
      ]
    }).then(alert => alert.present());
  }
  
  
  deletePlaylist(index: number, playlistId: string, userId: string) {
    const apiUrl = `https://backend-spotify-c0gn.onrender.com/api/playlist/deletePlaylist`;
    const authToken = localStorage.getItem('authToken');
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });
  
    const body = { userId, playlistId }; // Incluir userId y playlistId en el cuerpo de la solicitud DELETE
  
    this.http.delete(apiUrl, { headers, body }).subscribe(
      response => {
        console.log('Playlist deleted successfully', response);
        this.playlists.splice(index, 1); // Eliminar la playlist del array local
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error(`Playlist with ID ${playlistId} not found.`);
          // Manejo específico para el caso de playlist no encontrada
        } else {
          console.error('Error deleting playlist', error);
          // Otro manejo de errores si es necesario
        }
      }
    );
  }
  

  editPlaylistTitle(index: number) {
    this.playlists[index].isEditing = true;
  }

  savePlaylistTitle(index: number) {
    const playlist = this.playlists[index];
    this.updatePlaylist(playlist._id, playlist.name, playlist.songs).subscribe(
      response => {
        console.log('Playlist updated successfully', response);
        playlist.isEditing = false;
      },
      error => {
        console.error('Error updating playlist', error);
      }
    );
  }

  createPlaylist() {
    const apiUrl = 'https://backend-spotify-c0gn.onrender.com/api/playlist/createPlaylist';
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    const body = { name: 'Nueva playlist', songs: [] }; // Nombre de la nueva playlist y canciones

    this.http.post(apiUrl, body, { headers }).subscribe(
      response => {
        console.log('Playlist created successfully', response);
        this.loadPlaylists(); // Recargar la lista de playlists después de crear una nueva
      },
      error => {
        console.error('Error creating playlist', error);
      }
    );
  }

  updatePlaylist(id: string, newName: string, songs: string[]) {
    const apiUrl = 'https://backend-spotify-c0gn.onrender.com/api/playlist/updatePlaylist';
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    const body = { playlistId: id, name: newName, songs };

    return this.http.put(apiUrl, body, { headers });
  }

  navigateToPlaylistDetail(playlistId: string) {
    this.router.navigate(['/playlist-detail', playlistId]);
  }

}
