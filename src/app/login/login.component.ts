import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PeticionesService } from '../services/peticiones.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private peticionesService: PeticionesService,
    private loader: LoadingController,
    private alert: AlertController,
    private storage: Storage,
    private router: Router,
    ) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit() {
  }

  async getForm() {
    try {
      
      const loader = await this.loader.create({
        message: 'Cargando...',
      });
      await loader.present();
  
      console.log(this.loginForm.value);
      this.peticionesService.login(this.loginForm.value).subscribe(async res => {
        console.log(res);
  
        if (res['code'] == 1) {
        
           this.storage.set('apiToken', res['data']['apiToken']).then((tokenSaved)=>{

             console.log(tokenSaved);
              this.router.navigate(['/'])
           })
          
          
        } else {
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
    } catch (error) {
      throw error
    }

  }

}
