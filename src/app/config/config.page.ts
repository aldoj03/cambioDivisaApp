import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { first, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CambiosService } from '../services/cambios.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit, OnDestroy {

  public tokenSub;
  public checksDisabled;
  public isLoaded ;
  public divisasChecks;

  constructor(
    private peticionesService: PeticionesService,
    private loader: LoadingController,
    private alert: AlertController,
    private router: Router,
    private cambiosService: CambiosService
  ) {
    this.divisasChecks = {

      bcvCheck: false,
      dollarCheck: false,
      pesoCheck: false
    }
    this.checksDisabled = {
      bcvCheck: true,
      dollarCheck: true,
      pesoCheck: true
    }
  }
  
  ngOnInit() {
    this.isLoaded = false;

    this.getLocalChecks();

  }

  getLocalChecks() {
    
    this.cambiosService.emitChecksConfig().subscribe(val => {
      if (val.pesosCheck == "") {
        this.setupConfig()
      } else {
        for (const key in this.checksDisabled) {
          if (Object.prototype.hasOwnProperty.call(this.checksDisabled, key)) {
            this.checksDisabled[key] = false;

          }
          this.divisasChecks = val
          setTimeout(() => {

            this.isLoaded = true
          
          }, 200);

        }
      }

    })
  }

  async setupConfig() {
    (await this.peticionesService.configInit()).subscribe(val => {

      this.divisasChecks.pesoCheck = val[0]['arg_one'] == '1' ? true : false;
      this.divisasChecks.dollarCheck = val[0]['arg_two'] == '1' ? true : false;
      this.divisasChecks.bcvCheck = val[0]['arg_three'] == '1' ? true : false;

      this.cambiosService.setChecksConfig(this.divisasChecks)
      setTimeout(() => {

        this.isLoaded = true
      
      }, 200);

      for (const key in this.checksDisabled) {
        if (Object.prototype.hasOwnProperty.call(this.checksDisabled, key)) {
          this.checksDisabled[key] = false;
        }
      }
    })

  }

  async onChangeRadio(moneda) {
    if (this.isLoaded) {

      this.checksDisabled[moneda] = true;
      try {


        (await this.peticionesService.setConfig(this.divisasChecks)).subscribe(async res => {
          this.checksDisabled[moneda] = false;
          this.peticionesService.setConfig(this.divisasChecks)
          if (!res) {

            const alert = await this.alert.create({
              message: `Error ${res['message']}`,

            })

            await alert.present()

          } else {
            this.cambiosService.setChecksConfig(this.divisasChecks)
          }
        }, async err => {
          const alert = await this.alert.create({
            message: 'Error'
          })

          await alert.present()
        })
      } catch (error) {
        throw error
      }
    }

  }



  ngOnDestroy() {
  }


}
