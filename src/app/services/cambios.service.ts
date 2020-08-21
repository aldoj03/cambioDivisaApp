import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompareCambio } from '../interfaces/compare-cambio';

@Injectable({
  providedIn: 'root'
})
export class CambiosService {

  public compareCambios: BehaviorSubject<CompareCambio> = new BehaviorSubject({
    bcv: '',
    dateinfo: '',
    dollar: '',
    id: '',
    peso: '',
    username: ''
  })

  public checksConfig: BehaviorSubject<any> = new BehaviorSubject({
    pesosCheck: '',
    dollarCheck: '',
    bcvCheck: '',
  })
  
  cambioEmitido = this.compareCambios;

  checksEmitidos = this.checksConfig;
  
  constructor() { }

  setCompareCambio(cambios) {
    this.compareCambios.next(cambios)
  }

  emitLocalCambio() {
    return this.cambioEmitido
  }
  setChecksConfig(checks) {
    this.checksConfig.next(checks)
  }

  emitChecksConfig() {
    return this.checksEmitidos
  }
}
