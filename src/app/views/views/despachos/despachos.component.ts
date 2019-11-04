import { Component, OnInit } from '@angular/core';
import { Abertura } from '../../models/abertura/abertura';
import { AberturaService } from '../../services/abertura/abertura.service';
import { SalvaratendimentoService } from '../../services/salvaratendimento/salvaratendimento.service';
import { PdfService } from '../../../services/pdf/pdf.service';
import { OpensnackbarService } from '../../services/opensnackbar/opensnackbar.service';
import { AvisocamposService } from '../../../services/avisocampos/avisocampos.service';
import { AvisocamposComponent } from '../../../avisocampos/avisocampos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.scss']
})
export class DespachosComponent implements OnInit {
  nota = false;
  documento = false;
  representacao = false;
  visto = false;
  listaexigencia = [];
  disabled = false;

  constructor(
    private abertura: Abertura,
    private aberturaservice: AberturaService,
    private salvaratendimentoservice: SalvaratendimentoService,
    private pdfservice: PdfService,
    private opensnackservice: OpensnackbarService,
    private avisocamposservice: AvisocamposService,
    private router: Router
    ) { }

  ngOnInit() {
    this.abertura = new Abertura();
    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      this.abertura.agenterespcadastro = abertura.agenterespcadastro;
      this.abertura.autorizado = abertura.autorizado;
      this.abertura.processo = abertura.processo;
      this.abertura.nome = abertura.nome;
      this.abertura.identidade = abertura.identidade;
      this.abertura.dataabertura = abertura.dataabertura;
    });
  }

  onImprimirDeferimento() {
    this.disabled = true;
    this.abertura.motivo = 'Deferimento';
    this.salvaratendimentoservice.salvarAtendimento(this.abertura).subscribe(() => {
      this.pdfservice.downloadPDDespacho(this.abertura, 'Deferimento');
      this.refresh();
      this.disabled = false;
    }, error => {
      this.disabled = false;
      this.avisocamposservice.mudarAviso(4);
      this.opensnackservice.openSnackBarCampos(AvisocamposComponent, 2000);
    });
  }

  onImprimirIndeferimento() {
    this.disabled = true;
    this.abertura.motivo = 'Indeferimento';
    this.salvaratendimentoservice.salvarAtendimento(this.abertura).subscribe(() => {
      this.pdfservice.downloadPDDespacho(this.abertura, 'Indeferimento');
      this.refresh();
      this.disabled = false;
    }, error => {
      this.disabled = false;
      this.avisocamposservice.mudarAviso(4);
      this.opensnackservice.openSnackBarCampos(AvisocamposComponent, 2000);
    });
  }

  onImprimirExigencia() {
    this.disabled = true;
    this.abertura.motivo = 'Exigência';
    let exigencias = this.carregaListaExigencias();

    this.salvaratendimentoservice.salvarAtendimento(this.abertura).subscribe(() => {
      this.pdfservice.downloadPDDespacho(this.abertura, 'Exigência', exigencias);
      this.disabled = false;
      this.refresh();
    }, error => {
      this.avisocamposservice.mudarAviso(4);
      this.opensnackservice.openSnackBarCampos(AvisocamposComponent, 2000);
    });
  }

  onImprimirExigenciaCartoraria() {
    this.disabled = true;
    this.abertura.motivo = 'Exigência cartorária';
    let exigencias = this.carregaListaExigenciasCartoraria();

    this.salvaratendimentoservice.salvarAtendimento(this.abertura).subscribe(() => {
      this.pdfservice.downloadPDDespacho(this.abertura, 'Cartorária', exigencias);
      this.refresh();
      this.disabled = false;
    }, error => {
      this.disabled = false;
      this.avisocamposservice.mudarAviso(4);
      this.opensnackservice.openSnackBarCampos(AvisocamposComponent, 2000);
    });
  }

  carregaListaExigencias() {
    let indexnota = this.listaexigencia.indexOf('Nota fiscal dos bens e mercadorias');
    let indexdocumento = this.listaexigencia.indexOf('Documento que comprove a retenção dos bens e/ou mercadorias');
    let indexrepresentacao = this.listaexigencia.indexOf('Representação legal pública');
    let indexvisto = this.listaexigencia.indexOf('Visto de permanência ou passaporte');

    if (this.nota && indexnota === -1) {
      this.listaexigencia.push('Nota fiscal dos bens e mercadorias');
    } else if (!this.nota && this.listaexigencia.indexOf('Nota fiscal dos bens e mercadorias') !== -1) {
      this.listaexigencia.splice(indexnota, 1);
    }

    if (this.documento && indexdocumento === -1) {
      this.listaexigencia.push('Documento que comprove a retenção dos bens e/ou mercadorias');
    } else if (!this.documento && indexdocumento !== -1) {
      this.listaexigencia.splice(indexdocumento, 1);
    }

    if (this.representacao && indexrepresentacao === -1) {
      this.listaexigencia.push('Representação legal pública');
    } else if (!this.representacao && indexrepresentacao !== -1) {
      this.listaexigencia.splice(indexrepresentacao, 1);
    }

    if (this.visto && indexvisto === -1) {
      this.listaexigencia.push('Visto de permanência ou passaporte');
    } else if (!this.visto && indexvisto !== -1) {
      this.listaexigencia.splice(indexvisto, 1);
    }

    return this.listaexigencia;

  }

  carregaListaExigenciasCartoraria() {
    let indexnota = this.listaexigencia.indexOf('Nota fiscal dos bens e mercadorias');
    let indexdocumento = this.listaexigencia.indexOf('Documento que comprove a retenção dos bens e/ou mercadorias');
    let indexrepresentacao = this.listaexigencia.indexOf('Representação legal pública');
    let indexvisto = this.listaexigencia.indexOf('Visto de permanência ou passaporte');

    if (this.nota && indexnota === -1) {
      this.listaexigencia.push('Nota fiscal dos bens e mercadorias');
    } else if (!this.nota && this.listaexigencia.indexOf('Nota fiscal dos bens e mercadorias') !== -1) {
      this.listaexigencia.splice(indexnota, 1);
    }

    if (this.documento && indexdocumento === -1) {
      this.listaexigencia.push('Documento que comprove a retenção dos bens e/ou mercadorias');
    } else if (!this.documento && indexdocumento !== -1) {
      this.listaexigencia.splice(indexdocumento, 1);
    }

    if (this.representacao && indexrepresentacao === -1) {
      this.listaexigencia.push('Representação legal pública');
    } else if (!this.representacao && indexrepresentacao !== -1) {
      this.listaexigencia.splice(indexrepresentacao, 1);
    }

    if (this.visto && indexvisto === -1) {
      this.listaexigencia.push('Visto de permanência ou passaporte');
    } else if (!this.visto && indexvisto !== -1) {
      this.listaexigencia.splice(indexvisto, 1);
    }

    return this.listaexigencia;

  }

  refresh(): void {
    this.router.navigateByUrl('/consulta', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
    });
  }

}
