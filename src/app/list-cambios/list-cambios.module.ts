import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ListCambiosPageRoutingModule } from './list-cambios-routing.module';

import { ListCambiosPage } from './list-cambios.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ListCambiosPageRoutingModule
  ],
  declarations: [ListCambiosPage]
})
export class ListCambiosPageModule {}
