import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.page.html',
  styleUrls: ['./playlist-detail.page.scss'],
})
export class PlaylistDetailPage implements OnInit {
  playlistId: string = ''; // Inicializar playlistId aquí para evitar la advertencia
  playlist: any = { name: '', songs: [] };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.playlistId = id;
      this.loadPlaylistDetails();
    } else {
      console.error('No playlist ID found in route');
      // Puedes manejar esto según tus necesidades, por ejemplo, redirigir a una página de error.
    }
  }

  loadPlaylistDetails() {
    const apiUrl = `https://backend-spotify-c0gn.onrender.com/api/playlist/getPlaylistDetails/${this.playlistId}`;
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    this.http.get<any>(apiUrl, { headers }).subscribe(
      data => {
        if (data && data.playlist) {
          this.playlist = data.playlist;
        } else {
          console.error('Invalid response format', data);
        }
      },
      error => {
        console.error('Error fetching playlist details', error);
      }
    );
  }
}
