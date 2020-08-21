import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PeticionesService } from '../services/peticiones.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CambiosService } from '../services/cambios.service';

@Component({
  selector: 'app-set-cambios',
  templateUrl: './set-cambios.page.html',
  styleUrls: ['./set-cambios.page.scss'],
})
export class SetCambiosPage implements OnInit {

  public divisasForm;

  constructor(
    private peticionesService: PeticionesService,
    private loader: LoadingController,
    private alert: AlertController,
    private cambiosSerice: CambiosService

  ) { }

  ngOnInit() {
    this.divisasForm = new FormGroup({
      BS: new FormControl(''),
      COP: new FormControl(''),
      USD: new FormControl('')
    })

  }
  getCambiosActuales() {
    this.cambiosSerice.cambioEmitido.subscribe(val => {
       console.log(val);
       
    })
  }

  async onSubmit() {
    const loader = await this.loader.create({
      message: 'Cargando...',
    });
    await loader.present();



    const divisas = {
      peso: String(this.divisasForm.value.COP),
      dollar: String(this.divisasForm.value.USD),
      bcv: String(this.divisasForm.value.BS),
    }
    await (await this.peticionesService.updateCambios(divisas)).subscribe(async res => {
      console.log(res);
      this.cambiosSerice.setCompareCambio(divisas)
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

}
