import { BuscalacreService } from './../views/services/buscalacre/buscalacre.service';
import { AberturaService } from './../views/services/abertura/abertura.service';
import { Subscription } from 'rxjs';
import { BuscacepService } from './../services/buscacep/buscacep.service';
import { InscricaomunicipalService } from '../services/inscricaomunicipal/InscricaomunicipalService';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LogadoService } from '../services/logado/logado.service';
import { AvisocamposService } from '../services/avisocampos/avisocampos.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario/usuario';
import { Cadastro } from '../models/cadastro/cadastro';
import { Abertura } from '../views/models/abertura/abertura';
import { isCpf } from 'validator-brazil';



@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})

export class DadosComponent implements OnInit, OnDestroy {

  //#region variaveis
  subscription: Subscription;
  nome: string;
  usuario: string;
  link: string;
  sexo: string;
  base64Image: string;
  onAutorizadotipo = 0;
  exibicao = 0;
  listenpreenchimento = false;
  opcoes = [
    'Abertura',
    'Consulta',
    'Recurso',
    'Entrega',
    'Doação',
    'Descarte'
  ].sort();
  testeAutorizado: string;



  //#endregion

  //#region construtor
  constructor(
    private router: Router,
    public cadastro: Cadastro,
    public inscmunservice: InscricaomunicipalService,
    private serviceCampos: AvisocamposService,
    private logado: LogadoService,
    public buscacepService: BuscacepService,
    private aberturaservice: AberturaService,
    private abertura: Abertura,
    private buscarLacre: BuscalacreService
  ) { }
  //#endregion
  @ViewChild('submitButton', { static: true }) submitButton;
  ngOnInit() {
    this.cadastro = new Cadastro();
    this.abertura = new Abertura();

    this.logado.currentMessage.subscribe(user => {
      this.usuario = user.nome;
      (user.link) ? this.link = user.link.replace('open', 'uc') : this.link = '';
      this.cadastro.agenterespcadastro = user.nome;
    });
  }

  onfocusProcesso() {
    this.cadastro.processo = '';
  }

  // função para carregar o array de lacres
  // para disponibilizar esse array com atecedência
  // dado o possível iato no carregamento dos dados
  carregaLacres() {
    this.buscarLacre.buscarLacre().subscribe(arr => {
      const resp = this.buscarLacre.converteParaArrayDeLacres(arr.body);
      this.buscarLacre.atualizarArrayLacres(resp);
    });
  }

  onMotivo() {
    switch (this.cadastro.motivo) {
      case 'Abertura': {
        this.exibicao = 1;
        this.carregaLacres();
        break;
      }
      case 'Consulta': {
        this.exibicao = 2;
        break;
      }
      case 'Descarte': {
        this.carregaLacres();
        this.exibicao = 7;
        break;
      }
      case 'Doação': {
        this.carregaLacres();
        this.exibicao = 3;
        break;
      }
      case 'Entrega': {
        this.exibicao = 4;
        break;
      }
      case 'Recurso': {
        this.exibicao = 6;
        break;
      }
      default: {
        this.exibicao = 0;
        break;
      }
    }
  }

  onAutorizado(value: boolean) {

    if (value === true) {
      this.onAutorizadotipo = 1;
    } else {
      this.onAutorizadotipo = 2;
    }
  }

  // ao clicar no campo matricula reseta os atributos
  // do objeto cadastro ligados a matrícula
  // onMatricula() {
  //   this.cadastro.matricula = null;
  //   this.cadastro.nome = null;
  //   this.cadastro.autorizado = null;
  //   this.cadastro.concessao = null;
  //   this.cadastro.cpf = null;
  //   this.cadastro.equipamento = null;
  //   this.cadastro.isento = null;
  //   this.cadastro.local = null;
  //   this.cadastro.matricula = null;
  //   this.cadastro.nomeaux = null;
  //   this.cadastro.cpfaux = null;
  //   this.cadastro.numero = null;
  //   this.cadastro.documento = null;
  // }

  onCPF(cpf) {
    const res = isCpf(cpf);
    if (res === false) {
      this.cadastro.cpf = 'CPF INVÁLIDO';
    } else {
      this.onIdentificado();
      this.listenpreenchimento = true;
    }
  }

  // carrega o objeto abertura que poderá utilizado por outras views
  onIdentificado() {
    this.logado.currentMessage.subscribe(user => {
      this.abertura.cpf = this.cadastro.cpf;
      this.abertura.nome = this.cadastro.nome;
      this.abertura.agenterespcadastro = user.nome;
      this.abertura.processo = this.cadastro.processo;
      this.abertura.autorizado = this.cadastro.listenautorizado;
      this.abertura.motivo = this.cadastro.motivo;
      this.abertura.sexo = this.cadastro.sexo;
      if (typeof this.cadastro.matricula !== 'undefined') {
        this.abertura.matricula = this.cadastro.matricula;
      } else {
        this.abertura.matricula = '';
      }
      if (typeof this.cadastro.equipamento !== 'undefined') {
        this.abertura.equipamento = this.cadastro.equipamento;
        this.abertura.localequipamento = this.cadastro.local;
      } else {
        this.abertura.equipamento = '';
        this.abertura.localequipamento = '';
      }
      this.aberturaservice.atualizarAbertura(this.abertura);
    });

  }

  changeEvent() {
    this.submitButton.focus();
  }

  onSexo(value) {
    (value) ? this.sexo = 'mulher' : this.sexo = 'homem';
  }

  onLogout() {
    const userLogout = new Usuario();
    userLogout.nome = '';
    userLogout.link = '';
    userLogout.senha = '';
    userLogout.isValid = false;
    userLogout.login = '';
    this.logado.mudarUsuario(userLogout);
    this.router.navigateByUrl('');
  }

  buscaNotificado(value) {
    if (value && value.length === 8) {
      this.inscmunservice.buscarCadastro(value).subscribe(resp => {
        this.cadastro.nome = resp.body.nome;
        this.cadastro.autorizado = resp.body.autorizado;
        this.cadastro.concessao = resp.body.concessao;
        this.cadastro.cpf = resp.body.cpf;
        this.cadastro.equipamento = resp.body.equipamento;
        this.cadastro.isento = resp.body.isento;
        this.cadastro.local = resp.body.local;
        this.cadastro.matricula = resp.body.matricula;
        this.cadastro.nomeaux = resp.body.nomeaux;
        this.cadastro.cpfaux = resp.body.cpfaux;
        this.cadastro.numero = resp.body.numero;
        this.cadastro.documento = resp.body.documento;
        this.listenpreenchimento = true;
        this.onIdentificado();
      }, () => this.cadastro.nome = 'Inscrição Municipal inexistente'
      );
    } else {
      this.cadastro.nome = 'A matrícula tem 8 dígitos e foram digitados ' + value.length;
    }
  }

  ngOnDestroy(): void {
    this.serviceCampos.mudarAviso(1);
  }

}
