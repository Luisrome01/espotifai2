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
import { LoginPageModule } from './login/login.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalDeleteModule } from './modaldelete/modaldelete.module';
import { ModalupdatepasswordModule } from './modalupdatepassword/modalupdatepassword.module';
 
/*import { AuthInterceptor } from './auth.interceptor.interceptor';*/
@NgModule({
  declarations: [AppComponent, ModalComponent, AlbumArtistDetailModalComponent, ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, HttpClientModule, ModalupdatepasswordModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },/*{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor }, */],
  bootstrap: [AppComponent],
})
export class AppModule {}
