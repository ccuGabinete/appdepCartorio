import { Viewescolha } from './../../models/viewescolha';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscolhaService {
  public message = new Viewescolha();
  public messageSource = new BehaviorSubject(this.message);
  currentMessage = this.messageSource.asObservable();

  constructor() {
    this.message = {indice: 0, autorizado: 0};
  }

  mudarEscolha(escolha: Viewescolha) {
    this.messageSource.next(escolha);
  }
}
