import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from './music-player.service'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  selectedSong: any = null;
  currentTime: number = 0;
  duration: number = 0;
  isPlaying: boolean = false;
  currentVolume: number = 50;

  constructor(private musicPlayer: MusicPlayerService) {}

  ngOnInit() {
    this.musicPlayer.getSelectedSong().subscribe((song: any) => {
      this.selectedSong = song;
      if (song) {
        this.playSelectedSong();
      }
    });

    this.musicPlayer.getCurrentTime().subscribe((time: number) => {
      this.currentTime = time;
    });

    this.musicPlayer.getDuration().subscribe((duration: number) => {
      this.duration = duration;
    });

    this.musicPlayer.getIsPlaying().subscribe((playing: boolean) => {
      this.isPlaying = playing;
    });

    this.musicPlayer.getVolume().subscribe((volume: number) => {
      this.currentVolume = volume;
    });
  }

  playSelectedSong() {
    if (this.selectedSong) {
      this.musicPlayer.play();
    }
  }

  pauseSelectedSong() {
    this.musicPlayer.pause();
  }

  restartSong() {
    this.musicPlayer.seekTo(0);
  }

  nextSong() {
    // Aquí puedes implementar la lógica para reproducir la siguiente canción
    console.log('Siguiente canción');
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
