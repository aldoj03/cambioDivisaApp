import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-list-cambios',
  templateUrl: './list-cambios.page.html',
  styleUrls: ['./list-cambios.page.scss'],
})
export class ListCambiosPage implements OnInit, OnDestroy {

  public cambios;
  public tokenSusb;
  public cambioSubs;

  constructor(
    private loader: LoadingController,
    private peticionesService: PeticionesService,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.getHistory()
  }

  async getHistory(event = null) {

    const loader = await this.loader.create({
      message: 'Cargando...',
    });
    await loader.present();

    this.getList(false, loader)

  }

  ngOnDestroy() {
    this.tokenSusb.unsubscribe();
    this.cambioSubs.unsubscribe();
  }

  getList(event,loader = null){
    
    
    this.tokenSusb = this.peticionesService.returnDBToken()
      .subscribe(apiToken => {
        if (apiToken) {

          this.cambioSubs = this.peticionesService.getList({
            token: apiToken
          }).subscribe(res => {
            console.log(res);
            if(event){
              event.target.complete()
            }
            this.cambios = res;
            if(loader){
              loader.dismiss()
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
        }
      })
  }

}
