import { Component } from '@angular/core';
import { MusicPlayerService } from './music-player.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  selectedSong: any; // Aquí irá la canción seleccionada
  currentTime = 0;
  duration = 0;
  currentVolume = 50; // Volumen inicial
  isPlaying = false;

  constructor(private musicPlayer: MusicPlayerService) {}

  ngOnInit() {
    // Ejemplo de cómo se podría obtener la canción seleccionada
    this.selectedSong = this.musicPlayer.getSelectedSong();

    // Inicializar el reproductor con la canción seleccionada
    this.musicPlayer.init(this.selectedSong);

    // Suscripción para obtener el tiempo actual de reproducción
    this.musicPlayer.getCurrentTime().subscribe((time: number) => {
      this.currentTime = time;
    });

    // Suscripción para obtener la duración total de la canción
    this.musicPlayer.getDuration().subscribe((duration: number) => {
      this.duration = duration;
    });

    // Suscripción para obtener el estado de reproducción (play/pause)
    this.musicPlayer.getIsPlaying().subscribe((playing: boolean) => {
      this.isPlaying = playing;
    });

    // Establecer el volumen inicial
    this.musicPlayer.setVolume(this.currentVolume);
  }

  playSelectedSong() {
    this.musicPlayer.play();
  }

  pauseSelectedSong() {
    this.musicPlayer.pause();
  }

  seekTo(event: any) {
    const time = event.detail.value;
    this.musicPlayer.seekTo(time);
  }

  changeVolume(event: any) {
    const volume = event.detail.value;
    this.musicPlayer.setVolume(volume);
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) {
      return '0:00';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const displaySeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return `${minutes}:${displaySeconds}`;
  }
}
