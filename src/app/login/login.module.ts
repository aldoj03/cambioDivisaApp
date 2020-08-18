import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeticionesService } from '../services/peticiones.service';
import { LoginRoutingModule } from './login-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  providers:[PeticionesService]
})
export class LoginModule { }
