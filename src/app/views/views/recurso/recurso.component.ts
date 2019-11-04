import { Router } from '@angular/router';
import { PdfService } from './../../../services/pdf/pdf.service';
import { Component, OnInit } from '@angular/core';
import { Abertura } from '../../models/abertura/abertura';
import { AberturaService } from '../../services/abertura/abertura.service';
import { SalvaratendimentoService } from '../../services/salvaratendimento/salvaratendimento.service';
import { AvisocamposService } from '../../../services/avisocampos/avisocampos.service';
import { OpensnackbarService } from '../../services/opensnackbar/opensnackbar.service';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.scss']
})
export class RecursoComponent implements OnInit {

  disabled = false;
  
  constructor(
    public abertura: Abertura, // objeto de abertura vinda da tela inicial
    private aberturaatual: Abertura,
    private aberturaservice: AberturaService,
    private salvaratendimentoservice: SalvaratendimentoService,
    private avisocamposService: AvisocamposService,
    private opensnackbarService: OpensnackbarService,
    private pdfservide: PdfService,
    private router: Router
  ) { }

  ngOnInit() {
    this.abertura = new Abertura();
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
    this.disabled = true;
    this.pdfservide.downloadPDFRecurso(this.abertura);
    this.salvaratendimentoservice.salvarAtendimento(this.aberturaatual).subscribe(() => {
      this.disabled = false;
      this.refresh();
    });
  }

  refresh(): void {
    this.router.navigateByUrl('/recurso', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
    });
  }

}
