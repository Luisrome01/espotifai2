import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private audio: HTMLAudioElement;
  private currentTimeSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private durationSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private isPlayingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private selectedSongSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  private volumeSubject: BehaviorSubject<number> = new BehaviorSubject(50);

  constructor() {
    this.audio = new Audio();
    this.audio.ontimeupdate = () => {
      this.currentTimeSubject.next(this.audio.currentTime);
    };
    this.audio.onloadedmetadata = () => {
      this.durationSubject.next(this.audio.duration);
    };
    this.audio.onplay = () => {
      this.isPlayingSubject.next(true);
    };
    this.audio.onpause = () => {
      this.isPlayingSubject.next(false);
    };
  }

  setSong(song: any) {
    this.selectedSongSubject.next(song);
    this.audio.src = song.preview_url;
    this.audio.load();
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  seekTo(time: number) {
    this.audio.currentTime = time;
  }

  setVolume(volume: number) {
    this.audio.volume = volume / 100;
    this.volumeSubject.next(volume);
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

  getSelectedSong(): Observable<any> {
    return this.selectedSongSubject.asObservable();
  }

  getVolume(): Observable<number> {
    return this.volumeSubject.asObservable();
  }
}
