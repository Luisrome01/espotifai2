import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalDeleteComponent } from './modaldelete.component';

@NgModule({
  declarations: [ModalDeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [ModalDeleteComponent]
})
export class ModalDeleteModule {}
