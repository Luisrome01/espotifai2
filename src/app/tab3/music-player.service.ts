import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private audio = new Audio(); // Objeto de audio HTML5
  private songSubject = new BehaviorSubject<any>(null);
  song = this.songSubject.asObservable();
  isPlaying = false;

  constructor() {
    // Evento para detectar cuando la canción finaliza
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }

  setSong(song: any) {
    this.songSubject.next(song);
    this.loadSong(song);
  }

  play() {
    if (this.audio.paused) {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  pause() {
    if (!this.audio.paused) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  seekTo(seconds: number) {
    this.audio.currentTime = seconds;
  }

  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  getDuration(): number {
    return this.audio.duration;
  }

  private loadSong(song: any) {
    if (song.preview_url) {
      this.audio.src = song.preview_url;
      this.audio.load();
    } else {
      console.error('No preview available for this song.');
    }
  }
}
