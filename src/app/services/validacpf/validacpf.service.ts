import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacpfService {

  constructor() { }

  TestaCPF(cpf: string) {
    let Soma;
    let Resto;
    Soma = 0;
    if (cpf === '00000000000') { return false; }

    // tslint:disable-next-line: radix
    for (let i = 1; i <= 9; i++) { Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i); }
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) { Resto = 0; }
    // tslint:disable-next-line: radix
    if (Resto !== parseInt(cpf.substring(9, 10))) { return false; }

    Soma = 0;
    // tslint:disable-next-line: radix
    for (let i = 1; i <= 10; i++) { Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i); }
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) { Resto = 0; }
    // tslint:disable-next-line: radix
    if (Resto !== parseInt(cpf.substring(10, 11))) { return false; }
    return true;
  }

}
