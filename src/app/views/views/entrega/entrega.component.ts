import { SalvarlacreService } from './../../services/salvarlacre/salvarlacre.service';
import { FormatacoesService } from './../../services/formatacoes/formatacoes.service';
import { BuscalacreService } from './../../services/buscalacre/buscalacre.service';
import { Router } from '@angular/router';
import { PdfService } from './../../../services/pdf/pdf.service';
import { OpensnackbarService } from './../../services/opensnackbar/opensnackbar.service';
import { AvisocamposService } from './../../../services/avisocampos/avisocampos.service';
import { AberturaService } from './../../services/abertura/abertura.service';
import { SalvaratendimentoService } from './../../services/salvaratendimento/salvaratendimento.service';
import { Abertura } from './../../models/abertura/abertura';
import { Component, OnInit } from '@angular/core';
import { AvisocamposComponent } from '../../../avisocampos/avisocampos.component';
import { Lacre } from '../../models/lacre/lacre';
const go = console.log;

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {
  disabled = false;
  arrayOriginal: Lacre[];

  constructor(
    public abertura: Abertura, // objeto de abertura vinda da tela inicial
    private aberturaatual: Abertura,
    private aberturaservice: AberturaService,
    private salvaratendimento: SalvaratendimentoService,
    private avisocamposService: AvisocamposService,
    private opensnackbarService: OpensnackbarService,
    private pdfservice: PdfService,
    private router: Router,
    private buscarlacre: BuscalacreService,
    private formatacoes: FormatacoesService,
    private salvarlacre: SalvarlacreService

  ) { }

  ngOnInit() {
    this.abertura = new Abertura();
    this.aberturaatual = new Abertura();
    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      this.abertura = abertura;
      this.aberturaatual.agenterespcadastro = abertura.agenterespcadastro;
      this.aberturaatual.autorizado = abertura.autorizado;
      this.aberturaatual.processo = abertura.processo;
      this.aberturaatual.nome = abertura.nome;
      this.aberturaatual.identidade = abertura.identidade;
      this.aberturaatual.motivo = abertura.motivo;
      this.aberturaatual.dataabertura = abertura.dataabertura;
    });

    this.buscarlacre.arrayAtualOriginal.subscribe(arr => {
      go(arr);
      this.arrayOriginal = arr;
    });
  }

  onImprimir() {
    this.disabled = true;
    this.pdfservice.downloadPDFEntrega(this.abertura);
    this.salvaratendimento.salvarAtendimento(this.aberturaatual).subscribe(() => {
      this.disabled = false;
      this.refresh();
    }, error => {
      this.avisocamposService.mudarAviso(4);
      this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 4000);
    });
  }

  onChangeLacre() {
    this.abertura.lacre = this.formatacoes.colocaZeros(this.abertura.lacre);
    this.buscarlacre.arrayAtual.subscribe(arr => {
      go(arr);
      const lacrebuscado = arr.filter(t => t.numero === this.abertura.lacre);
      go(lacrebuscado);
      if (lacrebuscado.length > 0) {
        const strbuscada = lacrebuscado[0];
        go(strbuscada);
        go(this.arrayOriginal);
      } else {
        this.avisocamposService.mudarAviso(12);
        this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 2000);
      }

    });
  }

  onFocusLacre() {
    this.abertura.lacre = '';
  }

  refresh(): void {
    this.router.navigateByUrl('/entrega', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
    });
  }
}
