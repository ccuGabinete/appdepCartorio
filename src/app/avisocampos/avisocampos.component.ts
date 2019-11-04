import { AberturaService } from './../views/services/abertura/abertura.service';
import { Component, OnInit } from '@angular/core';
import { AvisocamposService } from '../services/avisocampos/avisocampos.service';

@Component({
  selector: 'app-avisocampos',
  templateUrl: './avisocampos.component.html',
  styleUrls: ['./avisocampos.component.scss']
})
export class AvisocamposComponent implements OnInit {
  loadingCampos = 1;
  codigo: string;

  constructor(
    private avisocampos: AvisocamposService,
    private aberturaservice: AberturaService
  ) { }

  ngOnInit() {
    this.avisocampos.currentMessage.subscribe(x => {
      this.loadingCampos = x;
    });
    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      if (typeof abertura.codigo !== 'undefined') {
        this.codigo = abertura.codigo;
      }
    });
  }

}
