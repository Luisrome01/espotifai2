import { Component } from '@angular/core';

@Component({
  selector: 'app-volume-control',
  templateUrl: './volume-control.component.html',
  styleUrls: ['./volume-control.component.scss']
})
export class VolumeControlComponent {
  volume: number = 50; // Valor inicial del volumen

  onVolumeChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.volume = Number(inputElement.value);
  }
}
