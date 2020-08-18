import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  private apiUrl;

  constructor(
    private httpClient : HttpClient
  ) {
    this.apiUrl = environment.urlApiWordpress
   }


  login(user){
    return this.httpClient.post(`${this.apiUrl}`,user)
  }
  validateToken(user){
    return this.httpClient.post(`${this.apiUrl}`,user)
  }
  getList(user){
    return this.httpClient.post(`${this.apiUrl}`,user)
  }
  updateCambios(user){
    return this.httpClient.post(`${this.apiUrl}`,user)
  }
  setConfig(user){
    return this.httpClient.post(`${this.apiUrl}`,user)
  }
}
