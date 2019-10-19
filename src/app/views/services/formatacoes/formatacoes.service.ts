import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatacoesService {

  constructor() { }

  fomataProcesso(p: string) {
    return p.substring(0, 4) + '/' + p.substring(4, 10) + '/' + p.substring(10);
  }

  colocaZeros(val: string) {
    const tamanho = val.length;
    if (tamanho < 8) {
      for (let i = 0; i < (8 - tamanho); i++) {
        val = '0' + val;
      }
    }

    return val;
  }



}
