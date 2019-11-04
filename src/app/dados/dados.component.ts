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
import { GeracodigoService } from '../views/services/geracodigo/geracodigo.service';



@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})

export class DadosComponent implements OnInit, OnDestroy {

  //#region variaveis
  disabled: boolean;
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
  listenautorizado = false;
  carregado = false;
  buscandoentrega = false;
  buscandorecurso = false;
  buscandoconsulta = false;
  buscandodoacao = false;
  buscandodescarte = false;
  buscandodespacho = false;
  processoencontrado = false;
  matriculaencontrada = false;
  exibirsexo = true;
  opcoes = [
    'Abertura',
    'Consulta',
    'Recurso',
    'Entrega',
    'Doação',
    'Descarte',
    'Despacho'
  ].sort();
  testeAutorizado: string;
  //#endregion variaveis

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
    private gerarcodigo: GeracodigoService

  ) { }
  //#endregion

  ngOnInit() {
    this.cadastro = new Cadastro();
    this.abertura = new Abertura();
    this.instituicao = new Instituicao();

    this.logado.currentMessage.subscribe(user => {
      this.usuario = user.nome;
      console.log(user);
      (user.link) ? this.link = user.link.replace('open', 'uc') : this.link = '';
      this.cadastro.agenterespcadastro = user.nome;
      if (user.setor === 'admin' || user.setor === 'gabinete') {
        this.disabled = true;
      } else {
        console.log(user.setor);
        this.disabled = false;
      }
    });
  }

  onEmail() {
    this.disabled = false;
    this.gerarcodigo.enviarCodigo().subscribe(data => {
      this.abertura.codigo = data.body.codigo;
      this.aberturaservice.atualizarAbertura(this.abertura);
      this.serviceCampos.mudarAviso(11);
      this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 4000);
      this.disabled = true;
    }, error => {
      this.serviceCampos.mudarAviso(11);
      this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 6000);
      this.disabled = true;
    });
  }

  onMotivo() {

    this.listenautorizado = true;

    switch (this.cadastro.motivo) {
      case 'Abertura': {
        this.exibicao = 1;
        this.carregaLacres();
        break;
      }
      case 'Consulta': {
        this.exibicao = 2;
        this.listenautorizado = false;
        this.onAutorizadotipo = 3;
        break;
      }
      case 'Descarte': {
        this.carregaLacres();
        this.exibicao = 7;
        this.listenautorizado = false;
        this.onAutorizadotipo = 3;
        break;
      }
      case 'Doação': {
        this.carregaLacres();
        this.exibicao = 3;
        this.listenautorizado = true;
        break;
      }
      case 'Entrega': {
        this.exibicao = 4;
        this.listenautorizado = false;
        this.onAutorizadotipo = 3;
        break;
      }
      case 'Recurso': {
        this.exibicao = 6;
        this.listenautorizado = false;
        this.onAutorizadotipo = 3;
        break;
      }
      case 'Despacho': {
        this.exibicao = 8;
        this.listenautorizado = false;
        this.onAutorizadotipo = 3;
        break;
      }
      default: {
        this.exibicao = 0;
        break;
      }
    }

    this.cadastro.processo = '';
    this.exibirsexo = false;
  }


  onProcesso() {
    // if (
    //   this.cadastro.motivo === 'Descarte'
    // ) {
    //   this.verificarProcessoEntrega(this.cadastro.processo);
    // }

    switch (this.cadastro.motivo) {
      case 'Abertura': {
        this.exibicao = 1;
        this.carregaLacres();
        break;
      }
      case 'Consulta': {
        this.buscarAtendimento();
        break;
      }
      case 'Descarte': {
        this.buscarAtendimento();
        break;
      }
      case 'Doação': {
        this.buscarInstituicaoDoacao();
        this.buscarAtendimento();
        break;
      }
      case 'Entrega': {
        this.buscarAtendimento();
        break;
      }
      case 'Recurso': {
        this.buscarAtendimento();
        break;
      }
      case 'Despacho': {
        this.buscarAtendimento();
        break;
      }
      default: {
        this.exibicao = 0;
        break;
      }
    }

    if (this.cadastro.motivo !== 'Doação') {
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
    this.salvardoacaoservice.buscarInstituicao(processo)
      .subscribe(data => {
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
          this.listenpreenchimento = true;
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
    this.buscandodoacao = true;
    this.salvardoacaoservice.buscarInstituicao(this.cadastro.processo).subscribe(data => {
      if (data.body.length > 0) {
        this.instituicao = data.body[0];
        // aqui tento passar direto para a impressao
        // caso a instituição já resteja cadastrada
        this.listenprocesso = false;
        this.listenpreenchimento = true;
        this.salvardoacaoservice.alterarInstituicao(this.instituicao);
        this.buscandodoacao = false;
      } else {
        this.buscandodoacao = false;
        this.listenprocesso = true;
        // this.listenpreenchimento = true;
      }
    }, error => {
      this.avisocamposService.mudarAviso(4);
      this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 2000);
      this.buscandodoacao = false;
    });
  }

  buscarAtendimento() {
    this.ativaLoading();
    this.salvaratendimento.buscarAtendimento(this.cadastro.processo).subscribe(data => {
      if (data.body === null) {
        this.avisocamposService.mudarAviso(9);
        this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 2000);
        this.zeraLoading();
      } else {
        this.abertura = data.body;
        this.abertura.motivo = this.cadastro.motivo;
        this.aberturaservice.atualizarAbertura(this.abertura);
        this.zeraLoading();
        this.listenpreenchimento = true;
      }
    }, error => {
      this.avisocamposService.mudarAviso(4);
      this.opensnackbarService.openSnackBarCampos(AvisocamposComponent, 2000);
      this.zeraLoading();
    });
  }

  zeraLoading() {
    this.buscandoentrega = false;
    this.buscandorecurso = false;
    this.buscandoconsulta = false;
    this.buscandodoacao = false;
    this.buscandodescarte = false;
    this.buscandodespacho = false;
    this.listenprocesso = false;
  }

  ativaLoading() {

    switch (this.cadastro.motivo) {
      case 'Consulta': {
        this.buscandoconsulta = true;
        break;
      }
      case 'Descarte': {
        this.buscandodescarte = true;
        break;
      }
      case 'Doação': {
        this.buscandodoacao = true;
        break;
      }
      case 'Entrega': {
        this.buscandoentrega = true;
        break;
      }
      case 'Recurso': {
        this.buscandorecurso = true;
        break;
      }
      case 'Despacho': {
        this.buscandodespacho = true;
        break;
      }
      default: {
        this.exibicao = 0;
        break;
      }
    }
  }


}
