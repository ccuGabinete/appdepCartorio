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

  constructor(
    public abertura: Abertura, // objeto de abertura vinda da tela inicial
    private aberturaservice: AberturaService,
    private salvaratendimento: SalvaratendimentoService,
    private avisocamposService: AvisocamposService,
    private opensnackbarService: OpensnackbarService
  ) { }

  ngOnInit() {
    this.abertura = new Abertura();
    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      this.abertura = abertura;
    });
  }

  onImprimir() {
    console.log(this.abertura);
  }

}
