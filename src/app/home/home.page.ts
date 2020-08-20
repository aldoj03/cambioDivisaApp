import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public tokenSusb;
  public cambioSubs;
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
    this.getList()
  }


  ngOnDestroy() {
    this.tokenSusb.unsubscribe();
    this.cambioSubs.unsubscribe();
  }

  getList(event = null) {


    this.tokenSusb = this.peticionesService.returnDBToken()
      .subscribe(apiToken => {
        if (apiToken) {

          this.cambioSubs = this.peticionesService.getList({
            token: apiToken
          }).subscribe(res => {
            console.log(res);
            if (event) {
              event.target.complete()
            }
            this.cambioActual = res[0];
            if (res[1]) {
              this.cambioAnterior = res[1];
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