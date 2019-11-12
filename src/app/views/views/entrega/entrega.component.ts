import { Grupo } from './../../../models/grupo/grupo';
import { GerardataService } from './../../services/gerardata/gerardata.service';
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
import { runInThisContext } from 'vm';
const go = console.log;

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {
  disabled = false;
  arrayOriginal: Lacre[];
  arrayLacresApresentacao: Lacre[] = [];
  ufir: string;
  listaautos = [];
  disabledUFIR = true;
  valorapagar = '0';

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
    private salvarlacre: SalvarlacreService,
    private gerardata: GerardataService,
    private grupo: Grupo

  ) { }

  ngOnInit() {
    this.grupo = new Grupo();
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

  onChangeAuto() {
    const arr = this.arrayOriginal.filter(x => x.auto === this.abertura.autodeapreensao);
    const response = this.buscarlacre.converteParaArrayDeLacres(arr);

    if (arr.length === 0) {
      this.avisocamposService.mudarAviso(12);
      this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 2000);
      this.abertura.autodeapreensao = '';
    } else {
      this.listaautos.push(this.abertura.autodeapreensao);
      response.forEach(x => {
        x.id = this.grupo.getId(x.grupo);
        this.arrayLacresApresentacao.push(x);
      });
    }
  }

  onChangeValorRef() {
    const dias = this.gerardata.calcularDiferenca(this.abertura.dataciencia);
    this.arrayLacresApresentacao.forEach(x => {
      if (x.id === 2) {
        x.valor = (((25.08 * dias * parseFloat(this.ufir)) / 10000) / 4).toFixed(2);
      }

      if (x.id === 3) {
        x.valor = (((25.08 * dias * parseFloat(this.ufir)) / 10000) / 1).toFixed(2);
      }

      if (x.id === 1) {
        x.valor = '0';
      }
    });
  }

  onFocusData() {
    this.abertura.dataciencia = null;
  }

  onChangeData(lacre: Lacre) {
    if (typeof this.abertura.dataciencia !== 'undefined' && this.abertura.dataciencia !== null) {
      this.disabledUFIR = false;
    }
  }

  onDelete(lacre: Lacre) {
    const index = this.arrayLacresApresentacao.findIndex(x => x.numero === lacre.numero);
    this.arrayLacresApresentacao.splice(index, 1);
  }

  onFocusAuto() {
    this.abertura.autodeapreensao = '';
  }

  onFocusUnif() {
    this.ufir = null;
  }

  onChangePeso(lacre: Lacre) {
    const dias = this.gerardata.calcularDiferenca(this.abertura.dataciencia);
    lacre.valor = (((lacre.peso * 25.08 * dias * parseFloat(this.ufir)) / 10000) / 100).toFixed(2);
  }

  onDeletarAuto(value: string) {
    const index = this.listaautos.indexOf(value);
    this.listaautos.splice(index, 1);
    this.arrayLacresApresentacao = this.arrayLacresApresentacao.filter(x => x.auto !== value);
  }

  onValorTotal() {
    go(this.arrayLacresApresentacao);
    this.valorapagar = this.arrayLacresApresentacao.reduce((a, b) => {
      // tslint:disable-next-line: radix
      return a + parseFloat(b.valor);
    }, 0).toFixed(2);
    go(this.valorapagar);
  }

  refresh(): void {
    this.router.navigateByUrl('/entrega', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
    });
  }
}
