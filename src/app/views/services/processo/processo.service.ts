import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../../../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  public processo: string;
  public buscarProcesso = new BehaviorSubject(this.processo);
  processoAtual = this.buscarProcesso.asObservable();

  constructor() {
    this.processo = '';
  }

  mudarProcesso(processo: string) {
    this.buscarProcesso.next(processo);
  }
}
