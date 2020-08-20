import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

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
  configInit(apiToken) {

    return this.httpClient.post(`${this.apiUrl}/api/configInit`, apiToken)
  }
  getList(apiToken) {
    return this.httpClient.post(`${this.apiUrl}/api/returnRegistro`, apiToken)
  }
  getLastRegistros(apiToken) {
    return this.httpClient.post(`${this.apiUrl}/api/campareCambio`, apiToken)
  }
  updateCambios(cambios) {
    return this.httpClient.post(`${this.apiUrl}/api/update`, cambios)
  }
  setConfig(checks) {
    const data = { ...checks };
    console.log(data);

    return this.httpClient.post(`${this.apiUrl}/api/setting`, data)
  }

  returnDBToken() {
    return from(this.storage.get('apiToken'))
  }

}
