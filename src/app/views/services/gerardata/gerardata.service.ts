import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
moment.defineLocale('America/Sao_Paulo', {
  parentLocale: 'pt-BR'
});

@Injectable({
  providedIn: 'root'
})
export class GerardataService {

  constructor() { }

  gerarData(bd?: boolean) {

    const data = Date.now();
    const dateMoment = moment(data);
    if (bd) {
      return dateMoment.format('DD/MM/YY');
    } else {
      return dateMoment.format('DD/MM/YYYY');
    }

  }

  gerarMomentData(date) {
    const dateMoment = moment(date).format('DD/MM/YYYY');
    return dateMoment;
  }

  gerarDataHora(date) {
    const dateMoment = moment(date).format('DD/MM/YYYY hh:mm:ss');
    return dateMoment;
  }

  calcularDiferenca(data: Date) {
    const a = moment(data);
    const b = moment(Date.now());
    return b.diff(a, 'days');
  }
}
