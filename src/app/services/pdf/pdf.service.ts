import { Abertura } from './../../views/models/abertura/abertura';
import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as imagens from '../../services/imagens';
import * as moment from 'moment-timezone';
import { TitleCasePipe, LowerCasePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  public pdfaviso = '';
  imageData = imagens.body;
  public buscarPdfaAviso = new BehaviorSubject(this.pdfaviso);
  pdfavisocorrente = this.buscarPdfaAviso.asObservable();

  mudarPdfAviso(aviso: string) {
    this.buscarPdfaAviso.next(aviso);
  }




  constructor(private titlecasePipe: TitleCasePipe, private lowercasePipe: LowerCasePipe) { }


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

  downloadPDF(abertura: Abertura) {
    //#region variaveis
    const dataexpedicao = abertura.dataexpedicao.toString();
    abertura.dataabertura = this.getDataExtenso(this.gerarData());
    const datacarimbo = this.formataDataCarimbo(this.gerarData());
    abertura.telcelular = this.formataCel(abertura.telcelular);
    abertura.telresidencial = this.formataRes(abertura.telresidencial);
    const dataextenso = this.getDataExtenso(this.gerarData()) + '.';
    abertura.processo = this.formataNumeroProcesso(abertura.processo);
    const atividadecomercial = this.formataAtividade(abertura.autorizado, abertura.matricula);
    abertura.nome = this.titlecasePipe.transform(abertura.nome);
    abertura.cep = this.formataCep(abertura.cep);
    abertura.email = this.lowercasePipe.transform(abertura.email);
    abertura.itensdiscriminados = this.lowercasePipe.transform(abertura.itensdiscriminados);
    //#endregion

    const coord = {

      text01: {
        texto: abertura.nome,
        x: 62,
        y: 74.09
      },

      text02: {
        texto: abertura.cpf,
        x: 65.5,
        y: 81
      },

      text03: {
        texto: abertura.identidade,
        x: 124,
        y: 81
      },

      text04: {
        texto: abertura.expedicao,
        x: 62.17,
        y: 88.15
      },

      text05: {
        texto: dataexpedicao,
        x: 92.3,
        y: 88.15
      },

      text06: {
        texto: abertura.nacionalidade,
        x: 155,
        y: 88.15
      },

      text07: {
        texto: abertura.estadocivil,
        x: 49,
        y: 95
      },

      text08: {
        texto: abertura.endereco,
        x: 115.5,
        y: 95
      },

      text09: {
        texto: abertura.numero,
        x: 32,
        y: 102.32
      },

      text10: {
        texto: abertura.complemento,
        x: 78,
        y: 102.32
      },

      text11: {
        texto: abertura.bairro,
        x: 131,
        y: 102.32
      },

      text12: {
        texto: abertura.municipio,
        x: 44.85,
        y: 110
      },

      text13: {
        texto: abertura.cep,
        x: 125,
        y: 110
      },

      text14: {
        texto: abertura.telresidencial,
        x: 175,
        y: 110
      },

      text15: {
        texto: abertura.telcelular,
        x: 53,
        y: 117
      },

      text16: {
        texto: abertura.email,
        x: 110,
        y: 117
      },

      text17: {
        texto: abertura.processo,
        x: 160.25,
        y: 9.5
      },

      text18: {
        texto: dataextenso,
        x: 80.75,
        y: 207.75
      },

      text19: {
        texto: datacarimbo,
        x: 165.9,
        y: 21.5
      },

      text20: {
        texto: atividadecomercial,
        x: 68.46,
        y: 136.29
      },

      text21: {
        texto: abertura.itensdiscriminados,
        x: 29.61,
        y: 153.96
      },

      text22: {
        texto: abertura.listaautos,
        x: 77.07,
        y: 172
      },

      text23: {
        texto: abertura.listatrms,
        x: 49.22,
        y: 180.75
      },

      text24: {
        texto: abertura.listalacres,
        x: 49.22,
        y: 190.33
      },

      imageBody: {
        x: 27,
        y: 5,
        w: 180.121,
        h: 231.21
      },
    };

    const doc = new jsPDF({
      orientaion: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.setProperties({
      title: 'Auto de Infração nº' + 'notificado.infracao',
      subject: 'Notificação do(a) Sr(a)' + 'notificado.nome',
      author: 'notificado.agenterespcadastro',
      keywords: ' ',
      creator: 'Coordenadoria de Controle Urbano'

    });

    //#region coordenadas
    doc.text(coord.text01.texto, coord.text01.x, coord.text01.y);
    doc.text(coord.text02.texto, coord.text02.x, coord.text02.y);
    doc.text(coord.text03.texto, coord.text03.x, coord.text03.y);
    doc.text(coord.text04.texto, coord.text04.x, coord.text04.y);
    doc.text(coord.text05.texto, coord.text05.x, coord.text05.y);
    doc.text(coord.text06.texto, coord.text06.x, coord.text06.y);
    doc.text(coord.text07.texto, coord.text07.x, coord.text07.y);
    doc.text(coord.text08.texto, coord.text08.x, coord.text08.y);
    doc.text(coord.text09.texto, coord.text09.x, coord.text09.y);
    doc.text(coord.text10.texto, coord.text10.x, coord.text10.y);
    doc.text(coord.text11.texto, coord.text11.x, coord.text11.y);
    doc.text(coord.text12.texto, coord.text12.x, coord.text12.y);
    doc.text(coord.text13.texto, coord.text13.x, coord.text13.y);
    doc.text(coord.text14.texto, coord.text14.x, coord.text14.y);
    doc.text(coord.text15.texto, coord.text15.x, coord.text15.y);
    doc.text(coord.text16.texto, coord.text16.x, coord.text16.y);
    doc.text(coord.text20.texto, coord.text20.x, coord.text20.y);
    doc.text(coord.text22.texto, coord.text22.x, coord.text22.y);
    doc.text(coord.text23.texto, coord.text23.x, coord.text23.y);
    doc.text(coord.text24.texto, coord.text24.x, coord.text24.y);
    doc.setFontSize(11);
    doc.text(coord.text18.texto, coord.text18.x, coord.text18.y);
    doc.text(coord.text21.texto, coord.text21.x, coord.text21.y);
    doc.setFontSize(18);
    doc.setFontStyle('bold');
    doc.text(coord.text19.texto, coord.text19.x, coord.text19.y);
    doc.setFontSize(15);
    doc.setFontStyle('bold');
    doc.text(coord.text17.texto, coord.text17.x, coord.text17.y);
    //#endregion
    doc.addImage(this.imageData, 'PNG', coord.imageBody.x, coord.imageBody.y, coord.imageBody.w, coord.imageBody.h);
    doc.save('Abertura de Processo nº' + '');
    this.mudarPdfAviso('ok');

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

  formataCep(cep: string) {
    return cep.substring(0, 5) + '-' + cep.substring(5);
  }
}
