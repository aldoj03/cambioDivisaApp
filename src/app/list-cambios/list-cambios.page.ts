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
    this.cambioSubs.unsubscribe();
  }

async  getList(event,loader = null){
    

          this.cambioSubs =  ( await this.peticionesService.getList()).subscribe(res => {
            console.log(res);
            if(event){
              event.target.complete()
            }
            this.cambios = res;
            if(loader){
              loader.dismiss()
            }
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

}
