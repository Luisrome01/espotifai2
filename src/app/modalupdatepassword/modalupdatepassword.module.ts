
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalupdatepasswordComponent } from './modalupdatepassword.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    ModalupdatepasswordComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalupdatepasswordComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalupdatepasswordModule { }
