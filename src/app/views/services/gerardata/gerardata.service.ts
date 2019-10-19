import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class GerardataService {

  constructor() { }

  gerarData(bd?: boolean) {
    moment.defineLocale('America/Sao_Paulo', {
      parentLocale: 'pt-BR'
    });
    const data = Date.now();
    const dateMoment = moment(data);
    if (bd) {
      return dateMoment.format('DD/MM/YY');
    } else {
      return dateMoment.format('DD/MM/YYYY');
    }

  }

  gerarMomentData(date) {
    moment.defineLocale('America/Sao_Paulo', {
      parentLocale: 'pt-BR'
    });
    const dateMoment = moment(date).format('DD/MM/YYYY');
    return dateMoment;
  }

  gerarDataHora(date) {
    moment.defineLocale('America/Sao_Paulo', {
      parentLocale: 'pt-BR'
    });
    const dateMoment = moment(date).format('DD/MM/YYYY hh:mm:ss');
    return dateMoment;
  }
}
