import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ModalComponent } from './components/modal.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumArtistDetailModalComponent } from './album-artist-detail-modal/album-artist-detail-modal.component';


@NgModule({
  declarations: [AppComponent, ModalComponent, AlbumArtistDetailModalComponent, ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
