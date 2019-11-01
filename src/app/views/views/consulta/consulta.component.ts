import { SalvaratendimentoService } from './../../services/salvaratendimento/salvaratendimento.service';
import { Component, OnInit } from '@angular/core';
import { AberturaService } from '../../services/abertura/abertura.service';
import { Abertura } from '../../models/abertura/abertura';
import { ClipboardService } from 'ngx-clipboard';
import { OpensnackbarService } from '../../services/opensnackbar/opensnackbar.service';
import { AvisocamposService } from '../../../services/avisocampos/avisocampos.service';
import { AvisocamposComponent } from '../../../avisocampos/avisocampos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  tipoescolha: string;
  escolha: boolean;
  disabled = false;

  constructor(private aberturaservice: AberturaService,
    private _clipboardService: ClipboardService,
    private opensnack: OpensnackbarService,
    private serviceCampos: AvisocamposService,
    private router: Router,
    public abertura: Abertura,
    private salvaratendimento: SalvaratendimentoService
  ) { }

  ngOnInit() {
    this.abertura = new Abertura();
    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      this.abertura.agenterespcadastro = abertura.agenterespcadastro;
      this.abertura.autorizado = abertura.autorizado;
      this.abertura.processo = abertura.processo;
      this.abertura.nome = abertura.nome;
      this.abertura.identidade = abertura.identidade;
      this.abertura.motivo = abertura.motivo;
      this.abertura.dataabertura = abertura.dataabertura;
      this._clipboardService.copyFromContent(this.abertura.processo.toString());
      this.serviceCampos.mudarAviso(7);
      this.opensnack.openSnackBarCampos(AvisocamposComponent, 4000);
    });
  }

  onEscolha(escolha) {

    if (escolha) {
      this.tipoescolha = 'Acesso ao sistema';
    } else {
      this.tipoescolha = 'Consulta de processo';
    }
  }

  goToLink(url: string) {
    this.disabled = true;
    this.salvaratendimento.salvarAtendimento(this.abertura).subscribe(() => {
      window.open(url, '_blank');
      this.disabled = false;
      this.refresh();
    }, error => {
      console.log(this.abertura);
      this.serviceCampos.mudarAviso(4);
      this.opensnack.openSnackBarCampos(AvisocamposComponent, 2500);
    });
  }

  refresh(): void {
    this.router.navigateByUrl('/consulta', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
    });
  }

}
