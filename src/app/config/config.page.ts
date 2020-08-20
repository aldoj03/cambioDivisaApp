import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit, OnDestroy {

  public bcvCheck;
  public dollarCheck;
  public pesoCheck;
  public token;
  public tokenSub;


  constructor(
    private peticionesService: PeticionesService,
    private loader: LoadingController,
    private alert: AlertController,
    private router: Router
  ) { }

  ngOnInit() {

   this.tokenSub = this.peticionesService.returnDBToken()
      .subscribe(apiToken => {
        if (apiToken) {
          this.token = apiToken;

          this.peticionesService.configInit({token: this.token}).subscribe(val=>{
            
            this.pesoCheck =  val[0]['arg_one'] == '1' ? true : false; 
            this.dollarCheck =  val[0]['arg_one'] == '1' ? true : false;
            this.bcvCheck = val[0]['arg_three'] == '1' ? true : false;
            
          })
          

        }else{
          this.router.navigate(['login'])
        }
      }
      )

    this.bcvCheck = false;
    this.dollarCheck = false;
    this.pesoCheck = false
  }

  async onChangeRadio() {

    const loader = await this.loader.create({
      message: 'Cargando...',
    });
    await loader.present();


    this.peticionesService.setConfig({
      bcvCheck: this.bcvCheck,
      dollarCheck: this.dollarCheck,
      pesoCheck: this.pesoCheck,
      token: this.token
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



  ngOnDestroy(){
    this.tokenSub.unsubscribe()
  }
  

}
