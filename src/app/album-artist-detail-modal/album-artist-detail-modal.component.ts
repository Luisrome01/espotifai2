import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-album-artist-detail-modal',
  templateUrl: './album-artist-detail-modal.component.html',
  styleUrls: ['./album-artist-detail-modal.component.scss'],
})
export class AlbumArtistDetailModalComponent implements OnInit {
  @Input() details: any = null;
  @Input() type: 'album' | 'artist' = 'album';

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}
