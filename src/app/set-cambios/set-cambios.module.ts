import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetCambiosPageRoutingModule } from './set-cambios-routing.module';

import { SetCambiosPage } from './set-cambios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetCambiosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SetCambiosPage]
})
export class SetCambiosPageModule {}
