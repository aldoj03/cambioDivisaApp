import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CambiosService } from '../services/cambios.service';
import { CompareCambio } from '../interfaces/compare-cambio';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public tokenSusb: Subscription;
  public cambioSubs: Subscription;
  public cambioActual: CompareCambio;
  public cambioAnterior: CompareCambio;

  constructor(
    private peticionesService: PeticionesService,
    private alert: AlertController,
    private router: Router,
    private cambiosService: CambiosService
  ) {
    this.cambioActual = {
      bcv: '',
      dateinfo: '',
      dollar: '',
      id: '',
      peso: '',
      username: '',
    }
    this.cambioAnterior = {
      bcv: '',
      dateinfo: '',
      dollar: '',
      id: '',
      peso: '',
      username: '',
    }
  }

  ngOnInit() {
    
    this.subscribeLocalCambios()
    console.log('init');
    
  }
  ionViewWillEnter() {
    console.log(this.cambioActual);
    
  }


  subscribeLocalCambios() {
    this.cambiosService.emitLocalCambio().pipe().subscribe(val => {
      if(val.bcv){

        console.log('local cambios', val);
        
        // this.cambioAnterior = this.cambioActual;
        this.cambioActual = val

      }else{
     this.getList(null)

      }

    })
  }

  async getList(event) {

    this.cambioSubs = (await this.peticionesService.getLastRegistros()).subscribe(res => {
      if(!res['code']){

        let compareArray = [];
        if (event) {
          event.target.complete()
        }
        this.cambioActual = res[0];
        compareArray.push(this.cambioActual)
        if (res[1]) {
          this.cambioAnterior = res[1];
        compareArray.push(this.cambioAnterior)

        } 

        this.cambiosService.setCompareCambio(this.cambioActual)
      }
        console.log(res);

    }, async err => {
      const alert = await this.alert.create({
        message: 'Error'
      })

      await alert.present()
      this.cambioSubs.unsubscribe();
    })

  }

  ionViewDidLeave() {

  }
  ngOnDestroy() {

  }

}

