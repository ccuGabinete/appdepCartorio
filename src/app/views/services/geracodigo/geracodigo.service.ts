import { Injectable } from '@angular/core';
const inicio = 43639;
const fim = 65536;
const reg = new RegExp(/[a-z]/i);
const max = 4;

@Injectable({
  providedIn: 'root'
})
export class GeracodigoService {

  constructor() { }

  geraCodigo() {
    let bol = false;
    let sorteado = '';
    let tamanho = 5;

    while (bol === false || tamanho !== max) {
      sorteado = Math.floor(Math.random() * fim + inicio).toString(16);
      bol = reg.test(sorteado);
      tamanho = sorteado.length;
    }
    return sorteado;
  }
}
