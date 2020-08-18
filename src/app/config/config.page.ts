import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  public bcvCheck;
  public dollarCheck;
  public pesoCheck;


  constructor(
    private peticionesService: PeticionesService,
    private loader: LoadingController,
    private alert: AlertController
  ) { }

  ngOnInit() {

    this.bcvCheck = false;
    this.dollarCheck = false;
    this.pesoCheck = false
  }

  async onChangeRadio() {

    const loader = await this.loader.create({
      message: 'Cargando...',
    });
    await loader.present();

    this.peticionesService.returnDBToken()
      .subscribe(apiToken => {
        if (apiToken) {

          this.peticionesService.setConfig({
            bcvCheck: this.bcvCheck,
            dollarCheck: this.dollarCheck,
            pesoCheck: this.pesoCheck,
            token: apiToken
          }).subscribe(async res => {
            console.log(res);
            console.log(res);

            if (!res) {


              const alert = await this.alert.create({
                message: `Error ${res['message']}`,

              })

              await alert.present()

            }
            loader.dismiss()
          }, async err => {
            const alert = await this.alert.create({
              message: 'Error'
            })

            await alert.present()
          })
        }
      })

  }

}
