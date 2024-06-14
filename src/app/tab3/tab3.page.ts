import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicPlayerService } from './music-player.service'; // Importar el servicio compartido
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit, OnDestroy {
  selectedSong: any;
  isPlaying = false;
  duration = 0;
  currentTime = 0;
  private songSubscription: Subscription | undefined; // Añadir inicializador

  constructor(private musicPlayerService: MusicPlayerService) {}

  ngOnInit() {
    this.songSubscription = this.musicPlayerService.song.subscribe((song) => {
      this.selectedSong = song;
    });
  }

  ngOnDestroy() {
    if (this.songSubscription) {
      this.songSubscription.unsubscribe();
    }
  }

  playSelectedSong() {
    if (this.selectedSong) {
      this.musicPlayerService.play();
      this.isPlaying = true;
      this.updateCurrentTime();
      this.updateDuration();
    }
  }

  pauseSelectedSong() {
    this.musicPlayerService.pause();
    this.isPlaying = false;
  }

  seekTo(event: any) {
    const seekTime = event.detail.value;
    this.musicPlayerService.seekTo(seekTime);
  }

  private updateCurrentTime() {
    setInterval(() => {
      this.currentTime = this.musicPlayerService.getCurrentTime();
    }, 1000);
  }

  private updateDuration() {
    setTimeout(() => {
      this.duration = this.musicPlayerService.getDuration();
    }, 1000);
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(val: number): string {
    return val < 10 ? `0${val}` : val.toString();
  }
}
