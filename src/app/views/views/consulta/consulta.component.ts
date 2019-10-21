import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  tipoescolha: string;
  escolha: boolean;

  constructor() { }

  ngOnInit() {
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
  }

}
