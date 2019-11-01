import { Router } from '@angular/router';
import { PdfService } from './../../../services/pdf/pdf.service';
import { OpensnackbarService } from './../../services/opensnackbar/opensnackbar.service';
import { AvisocamposService } from './../../../services/avisocampos/avisocampos.service';
import { AberturaService } from './../../services/abertura/abertura.service';
import { SalvaratendimentoService } from './../../services/salvaratendimento/salvaratendimento.service';
import { Abertura } from './../../models/abertura/abertura';
import { Component, OnInit } from '@angular/core';
import { AvisocamposComponent } from '../../../avisocampos/avisocampos.component';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {

  constructor(
    public abertura: Abertura, // objeto de abertura vinda da tela inicial
    private aberturaatual: Abertura,
    private aberturaservice: AberturaService,
    private salvaratendimento: SalvaratendimentoService,
    private avisocamposService: AvisocamposService,
    private opensnackbarService: OpensnackbarService,
    private pdfservice: PdfService,
    private router: Router

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
  }

  onImprimir() {
    this.pdfservice.downloadPDFEntrega(this.abertura);
    this.salvaratendimento.salvarAtendimento(this.aberturaatual).subscribe(() => {
      this.refresh();
    }, error => {
      this.avisocamposService.mudarAviso(4);
      this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 4000);
    });
  }

  refresh(): void {
    this.router.navigateByUrl('/entrega', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
    });
  }
}
