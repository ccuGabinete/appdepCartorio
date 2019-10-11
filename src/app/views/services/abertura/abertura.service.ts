import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Abertura } from '../../models/abertura/abertura';

@Injectable({
  providedIn: 'root'
})
export class AberturaService {

  public abertura = new Abertura();
  public buscarAbertura = new BehaviorSubject(this.abertura);
  correnteAbertura = this.buscarAbertura.asObservable();

  constructor() {
    this.abertura = null;
  }

  atualizarAbertura(abertura: Abertura) {
    this.buscarAbertura.next(abertura);
  }
}
