import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private audio: HTMLAudioElement;
  private selectedSong: any;
  private isPlayingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentTimeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private durationSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.audio = new Audio();
    this.audio.addEventListener('timeupdate', () => {
      this.currentTimeSubject.next(this.audio.currentTime);
    });

    this.audio.addEventListener('durationchange', () => {
      this.durationSubject.next(this.audio.duration);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlayingSubject.next(false);
    });
  }

  init(song: any) {
    this.selectedSong = song;
    this.audio.src = this.selectedSong.preview_url;
    this.audio.load();
  }

  play() {
    if (this.selectedSong && this.selectedSong.preview_url) {
      this.audio.play();
      this.isPlayingSubject.next(true);
    }
  }

  pause() {
    if (this.selectedSong && this.selectedSong.preview_url) {
      this.audio.pause();
      this.isPlayingSubject.next(false);
    }
  }

  seekTo(time: number) {
    this.audio.currentTime = time;
  }

  setVolume(volume: number) {
    if (volume >= 0 && volume <= 100) {
      this.audio.volume = volume / 100;
    }
  }

  setSong(song: any) {
    this.selectedSong = song;
    this.init(this.selectedSong);
  }

  getSelectedSong(): any {
    return this.selectedSong;
  }

  getCurrentTime(): Observable<number> {
    return this.currentTimeSubject.asObservable();
  }

  getDuration(): Observable<number> {
    return this.durationSubject.asObservable();
  }

  getIsPlaying(): Observable<boolean> {
    return this.isPlayingSubject.asObservable();
  }
}
