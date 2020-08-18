import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCambiosPageRoutingModule } from './list-cambios-routing.module';

import { ListCambiosPage } from './list-cambios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCambiosPageRoutingModule
  ],
  declarations: [ListCambiosPage]
})
export class ListCambiosPageModule {}
