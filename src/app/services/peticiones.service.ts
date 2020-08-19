import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  private apiUrl;
  public token;
  constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) {
    this.apiUrl = environment.urlApiWordpress
  }


  login(user) {
    return this.httpClient.post(`${this.apiUrl}/token`, user)
  }
  validateToken(apiToken) {

    return this.httpClient.post(`${this.apiUrl}/token/validate`, apiToken)
  }
  getList(apiToken) {
    return this.httpClient.post(`${this.apiUrl}/api/returnTable`, apiToken)
  }
  updateCambios(cambios) {
    return this.httpClient.post(`${this.apiUrl}/api/update`, cambios)
  }
   setConfig(checks) {
    const data =  { ...checks };
    console.log(data);
    
    return this.httpClient.post(`${this.apiUrl}/api/setting`, data)
  }

  returnDBToken() {
    return from(this.storage.get('apiToken'))
  }

}
