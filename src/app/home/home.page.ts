import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public tokenSusb: Subscription;
  public cambioSubs:Subscription;
  public cambioActual:res;
  public cambioAnterior:res;

  constructor(
    private peticionesService: PeticionesService,
    private alert: AlertController,
    private router: Router
  ) {
    this.cambioActual = {
      bcv :'',
      dateinfo: '',
      dollar: '',
      id: '',
      peso: '',
      username: '',
    }
    this.cambioAnterior = {
      bcv :'',
      dateinfo: '',
      dollar: '',
      id: '',
      peso: '',
      username: '',
    }
   }

  ngOnInit() {
    console.log('init');
    
  }
  ionViewDidLeave() {
    this.tokenSusb.unsubscribe();
    if(this.cambioSubs){

      this.cambioSubs.unsubscribe();
    }
  }
  ionViewWillEnter() {
    this.getList()
    
  }
  ngOnDestroy() {
    console.log(1);
    
    this.tokenSusb.unsubscribe();
    this.cambioSubs.unsubscribe();
  }

  getList(event = null) {


    this.tokenSusb = this.peticionesService.returnDBToken()
      .subscribe(apiToken => {
        console.log(apiToken)
        if (apiToken) {

          this.cambioSubs = this.peticionesService.getLastRegistros({
            token: apiToken
          }).subscribe(res => {
            console.log(res);
            if (event) {
              event.target.complete()
            }
            this.cambioActual = res[0];
            if (res[1]) {
              this.cambioAnterior = res[1];
            }else{
              this.router.navigate(['login'])
            }

            this.tokenSusb.unsubscribe();
            this.cambioSubs.unsubscribe();
          }, async err => {
            const alert = await this.alert.create({
              message: 'Error'
            })

            await alert.present()
            this.tokenSusb.unsubscribe();
            this.cambioSubs.unsubscribe();
          })
        }else{
          this.router.navigate(['login'])
        }
      })
  }

}

interface res  {
  bcv :string;
  dateinfo: string,
  dollar: string,
  id: string,
  peso: string,
  username: string,
}