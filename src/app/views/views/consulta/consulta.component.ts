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

  constructor(private aberturaservice: AberturaService,
    private _clipboardService: ClipboardService,
    private opensnack: OpensnackbarService,
    private serviceCampos: AvisocamposService,
    private router: Router,
    public abertura: Abertura
    ) { }

  ngOnInit() {
    this.abertura = new Abertura();
    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      this.abertura = abertura;
      this._clipboardService.copyFromContent(this.abertura.processo.toString());
      this.serviceCampos.mudarAviso(7);
      this.opensnack.openSnackBarCampos(AvisocamposComponent, 4000);
    })
  }

  onEscolha(escolha) {

    if (escolha) {
      this.tipoescolha = 'Acesso ao sistema';
    } else {
      this.tipoescolha = 'Consulta de processo';
    }
  }

  goToLink(url: string) {
    window.open(url, "_blank");
    this.refresh();
  }

  refresh(): void {
    this.router.navigateByUrl('/consulta', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
    });
  }

}
