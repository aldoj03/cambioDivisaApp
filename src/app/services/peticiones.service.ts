import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  private apiUrl;
  public token;
  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
    this.apiUrl = environment.urlApiWordpress
  }


  login(user) {
    return this.httpClient.post(`${this.apiUrl}/login`, user)
  }
  validateToken(apiToken) {

    return this.httpClient.post(`${this.apiUrl}/token/validate`, apiToken)
  }
  async configInit() {
    const token = await this.storage.get('apiToken')
    if (!token) {
      this.router.navigate(['login'])
    }
    return this.httpClient.post(`${this.apiUrl}/api/configInit`, { token })
  }
  async getList() {

    const token = await this.storage.get('apiToken')
    if (!token) {
      this.router.navigate(['login'])
    }
    return this.httpClient.post(`${this.apiUrl}/api/returnRegistro`, { token })
  }

  async getLastRegistros() {
    const token = await this.storage.get('apiToken')
    if (!token) {
      this.router.navigate(['login'])
    }
    return this.httpClient.post(`${this.apiUrl}/api/changes`, { token })
  }
  async updateCambios(cambios) {
    const token = await this.storage.get('apiToken')
    if (!token) {
      this.router.navigate(['login'])
    }
    return this.httpClient.post(`${this.apiUrl}/api/update`, { ...cambios, token })
  }
  async setConfig(checks) {
    const token = await this.storage.get('apiToken')
    if (!token) {
      this.router.navigate(['login'])
    }

    const data = { ...checks, token };

    return this.httpClient.post(`${this.apiUrl}/api/setting`, data)
  }

  returnDBToken() {
    return from(this.storage.get('apiToken'))
  }

}
