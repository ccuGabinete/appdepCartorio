import { AvisocamposService } from './../services/avisocampos/avisocampos.service';
import { OpensnackbarService } from './../views/services/opensnackbar/opensnackbar.service';
import { SalvaratendimentoService } from './../views/services/salvaratendimento/salvaratendimento.service';
import { AvisocamposComponent } from './../avisocampos/avisocampos.component';
import { BuscalacreService } from './../views/services/buscalacre/buscalacre.service';
import { AberturaService } from './../views/services/abertura/abertura.service';
import { Subscription } from 'rxjs';
import { BuscacepService } from './../services/buscacep/buscacep.service';
import { InscricaomunicipalService } from '../services/inscricaomunicipal/InscricaomunicipalService';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { LogadoService } from '../services/logado/logado.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario/usuario';
import { Cadastro } from '../models/cadastro/cadastro';
import { Abertura } from '../views/models/abertura/abertura';
import { isCpf } from 'validator-brazil';
import { SalvardoacaoService } from '../views/services/salvardoacao/salvardoacao.service';
import { Instituicao } from '../views/models/instituicao/instituicao';



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
  listenprocesso = false;
  carregado = false;
  processoencontrado = false;
  matriculaencontrada = false;
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
    public instituicao: Instituicao,
    public cadastro: Cadastro,
    public inscmunservice: InscricaomunicipalService,
    private router: Router,
    private serviceCampos: AvisocamposService,
    private logado: LogadoService,
    public buscacepService: BuscacepService,
    private aberturaservice: AberturaService,
    private abertura: Abertura,
    private buscarLacre: BuscalacreService,
    private avisocamposService: AvisocamposService,
    private salvaratendimento: SalvaratendimentoService,
    private salvardoacaoservice: SalvardoacaoService,
    private opensnackbarService: OpensnackbarService,

  ) { }
  //#endregion
  @ViewChild('nomefocus', { static: true }) nomefocus: ElementRef;

  ngOnInit() {
    this.cadastro = new Cadastro();
    this.abertura = new Abertura();
    this.instituicao = new Instituicao();

    this.logado.currentMessage.subscribe(user => {
      this.usuario = user.nome;
      (user.link) ? this.link = user.link.replace('open', 'uc') : this.link = '';
      this.cadastro.agenterespcadastro = user.nome;
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

  onProcesso() {
    if (
      this.cadastro.motivo === 'Descarte'
    ) {
      this.verificarProcessoEntrega(this.cadastro.processo);
    }
    if (
      this.cadastro.motivo === 'Doação'
    ) {
      this.buscarInstituicaoDoacao();
    }

    if (this.cadastro.motivo !== 'Descarte' && this.cadastro.motivo !== 'Doação') {
      this.listenprocesso = true;
    }
  }

  onfocusProcesso() {
    this.cadastro.processo = '';
    this.listenprocesso = false;
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



  onAutorizado(value: boolean) {

    if (value === true) {
      this.onAutorizadotipo = 1;
    } else {
      this.onAutorizadotipo = 2;
    }
  }


  onCPF(cpf) {
    const res = isCpf(cpf);
    if (res === false) {
      this.cadastro.cpf = 'CPF INVÁLIDO';
    } else {
      this.onIdentificado();
      this.listenpreenchimento = true;
    }
  }

  onFocusCPF() {
    this.cadastro.cpf = '';
    this.listenpreenchimento = false;
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

  onFocusMatricula() {
    if (typeof this.instituicao.matricula !== 'undefined' && this.instituicao.matricula.length === 1) {
      this.cadastro.matricula = '';
      this.cadastro.nome = '';
      this.processoencontrado = false;
      this.listenpreenchimento = false;
    }

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
    this.matriculaencontrada = true;

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
      this.processoencontrado = true;
      this.matriculaencontrada = false;
    }, () => {
      this.processoencontrado = false;
      this.matriculaencontrada = false;
      if (!this.cadastro.autorizado) {
        this.listenpreenchimento = false;
      } else {
        this.listenpreenchimento = true;
      }
      this.serviceCampos.mudarAviso(10);
      this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 2000);
    }
    );


  }

  ngOnDestroy(): void {
    this.serviceCampos.mudarAviso(1);
    this.cadastro = new Cadastro();
    this.abertura = new Abertura();
    this.onAutorizadotipo = 0;
    this.exibicao = 0;
    this.listenpreenchimento = false;
    this.listenprocesso = false;
    this.carregado = false;
    this.processoencontrado = false;
    this.matriculaencontrada = false;
  }

  verificarProcessoEntrega(processo: string) {
    this.carregado = true;
    this.salvaratendimento.buscarAtendimento(processo)
      .subscribe(data => {
        console.log(data.body);
        if (data.body === null) {
          this.avisocamposService.mudarAviso(9);
          this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 2000);
          this.carregado = false;
          this.listenprocesso = false;
        } else {
          this.abertura = data.body;
          this.aberturaservice.atualizarAbertura(this.abertura);
          this.listenprocesso = true;
          this.carregado = false;
        }
      }, erro => {
        this.listenprocesso = false;
        this.avisocamposService.mudarAviso(4);
        this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 2000);
        this.carregado = false;
      }
      );
  }

  buscarInstituicaoDoacao() {
    this.salvardoacaoservice.buscarInstituicao(this.cadastro.processo).subscribe(data => {
      if (data.body.length > 0) {
        this.instituicao = data.body[0];
        // aqui tento passar direto para a impressao
        // caso a instituição já resteja cadastrada
        this.listenprocesso = false;
        this.listenpreenchimento = true;
        this.salvardoacaoservice.alterarInstituicao(this.instituicao);
      }
    }, error => {
      this.avisocamposService.mudarAviso(4);
      this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 2000);
    })
  }
}
