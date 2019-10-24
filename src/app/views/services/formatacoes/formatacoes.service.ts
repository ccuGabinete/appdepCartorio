import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class FormatacoesService {

  constructor() { }

  fomataProcesso(p: string) {
    return p.substring(0, 4) + '/' + p.substring(4, 10) + '/' + p.substring(10);
  }

  formataCNPJ(cnpj: string) {
    let str = '';
    str += cnpj.substring(0, 2) + '.';
    str += cnpj.substring(2, 5) + '.';
    str += cnpj.substring(5, 8) + '/';
    str += cnpj.substring(8, 12) + '-';
    str += cnpj.substring(12);

    return str;
  }

  formataCPF(cpf: string) {
    let str = '';
    str += cpf.substring(0, 3) + '.';
    str += cpf.substring(3, 6) + '.';
    str += cpf.substring(6, 9) + '-';
    str += cpf.substring(9);

    return str;
  }

  formataCEP(cep: string) {
    let str = '';
    str += cep.substring(0, 5) + '-';
    str += cep.substring(5);
    return str;
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

  getDataExtenso(data: string) {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'dezembro'
    ];

    // tslint:disable-next-line: prefer-const
    let mes = data.substring(3, 5);
    // tslint:disable-next-line: radix
    return data.substring(0, 2) + ' de ' + meses[parseInt(mes) - 1] + ' de ' + data.substring(6);
  }

  gerarData() {
    const data = Date.now();
    const dateMoment = moment(data);
    return dateMoment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
  }

  formataDataCarimbo(data: string) {
    return data.substring(0, 2) + ' ' + data.substring(3, 5) + ' ' + data.substring(8);
  }

  formataNumeroProcesso(processo: String) {
    return processo.substring(4, 7) + '.' + processo.substring(7, 10) + '/' + processo.substring(10);
  }

  formataAtividade(autorizado: boolean, matricula?: string) {
    if (autorizado) {
      return 'Comércio ambulate autorizado - ' + matricula;
    } else {
      return 'Comércio ambulante não autorizado';
    }
  }

  formataRes(tel: string) {
    const p1 = tel.substring(0, 2);
    const p2 = tel.substring(2, 6);
    const p3 = tel.substring(6, 10);
    return '(' + p1 + ') ' + p2 + '-' + p3;
  }

  formataCel(res: string) {
    const sp1 = res.substring(0, 2);
    const sp2 = res.substring(2, 5);
    const sp3 = res.substring(5, 8);
    const sp4 = res.substring(8, 11);
    return '(' + sp1 + ') ' + sp2 + '-' + sp3 + '-' + sp4;

  }



}
