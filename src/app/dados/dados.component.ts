import { AberturaService } from './../views/services/abertura/abertura.service';
import { Subscription } from 'rxjs';
import { ValidacpfService } from './../services/validacpf/validacpf.service';
import { BuscacepService } from './../services/buscacep/buscacep.service';
import { Localmulta } from './../models/localmulta/localmulta';
import { InscricaomunicipalService } from '../services/inscricaomunicipal/InscricaomunicipalService';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AvisocamposComponent } from '../avisocampos/avisocampos.component';
import { LogadoService } from '../services/logado/logado.service';
import { AvisocamposService } from '../services/avisocampos/avisocampos.service';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario/usuario';
import { PdfService } from '../services/pdf/pdf.service';
import { Cadastro } from '../models/cadastro/cadastro';
import { Abertura } from '../views/models/abertura/abertura';



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
  processo: String;
  motivo: string;
  panelOpenState = false;
  base64Image: string;
  options = {
    types: ['geocode'],
    componentRestrictions: { country: 'BR' },
    location: [-22.921712, -43.449187]
  };
  autorizado = false;
  onAutorizadotipo = 0;
  exibicao = 0;
  listenprocesso = false;
  listenpreenchimento = false;
  listenautorizado: boolean;
  opcoes = [
    'Abertura',
    'Consulta',
    'Recurso',
    'Entrega',
    'Doação',
    'Atendimento'
  ].sort();
  testeAutorizado: string;
  orgaos = [
    { sigla: 'SSP', orgao: 'Secretaria de Segurança Pública' },
    { sigla: 'PM', orgao: 'Polícia Militar' },
    { sigla: 'PC', orgao: 'Policia Civil' },
    { sigla: 'CNT', orgao: 'Carteira Nacional de Habilitação' },
    { sigla: 'DIC', orgao: 'Diretoria de Identificação Civil' },
    { sigla: 'CTPS', orgao: 'Carteira de Trabaho e Previdência Social' },
    { sigla: 'FGTS', orgao: 'Fundo de Garantia do Tempo de Serviço' },
    { sigla: 'IFP', orgao: 'Instituto Félix Pacheco' },
    { sigla: 'IPF', orgao: 'Instituto Pereira Faustino' },
    { sigla: 'IML', orgao: 'Instituto Médico-Legal' },
    { sigla: 'MTE', orgao: 'Ministério do Trabalho e Emprego' },
    { sigla: 'MMA', orgao: 'Ministério da Marinha' },
    { sigla: 'MAE', orgao: 'Ministério da Aeronáutica' },
    { sigla: 'MEX', orgao: 'Ministério do Exército' },
    { sigla: 'POF', orgao: 'Polícia Federal' },
    { sigla: 'POM', orgao: 'Polícia Militar' },
    { sigla: 'SES', orgao: 'Carteira de Estrangeiro' },
    { sigla: 'SJS', orgao: 'Secretaria da Justiça e Segurança' },
    { sigla: 'SJTS', orgao: 'Secretaria da Justiça do Trabalho e Segurança' },
    { sigla: 'OUT', orgao: 'Outros' }

  ].sort((a, b) => {
    if (a.orgao < b.orgao) {
      return -1;
    }
    return 0;
  });

  nacionalidades = [
    'Brasileira',
    'Afegã',
    'Alemã',
    'Americana',
    'Angolana',
    'Antiguana',
    'Árabe, emiratensa',
    'Argélia',
    'Argentina',
    'Armena',
    'Australiana',
    'Austríaca',
    'Bahamensa',
    'Bangladesa',
    'Barbadiana',
    'Bechuana',
    'Belga',
    'Belizenha',
    'Boliviana',
    'Britânica',
    'Camaronensa',
    'Canadense',
    'Chilena',
    'Chinesa',
    'Cingalêsa',
    'Colombiana',
    'Comorensa',
    'Costarriquenha',
    'Croata',
    'Cubana',
    'Dinamarquêa',
    'Dominicana',
    'Egípcia',
    'Equatoriana',
    'Escocêsa',
    'Eslovaca',
    'Eslovena',
    'Espanhola',
    'Francêsa',
    'Galesa',
    'Ganesa',
    'Granadina',
    'Grega',
    'Guatemalteca',
    'Guianensa',
    'Guianêsa',
    'Haitiana',
    'Holandêsa',
    'Hondurenha',
    'Húngara',
    'Iemenita',
    'Indiana',
    'Indonésa',
    'Inglêsa',
    'Iraniana',
    'Iraquiana',
    'Irlandêa',
    'Israelita',
    'Italiana',
    'Jamaicana',
    'Japonêsa',
    'Líbia',
    'Malaia',
    'Marfinensa',
    'Marroquina',
    'Mexicana',
    'Moçambicana',
    'Neozelandêsa',
    'Nepalêsa',
    'Nicaraguensa',
    'Nigeriana',
    'Norte-coreana',
    'Noruega',
    'Omanensa',
    'Palestina',
    'Panamenha',
    'Paquistanêsa',
    'Paraguaia',
    'Peruana',
    'Polonesa',
    'Portorriquenha',
    'Portuguesa',
    'Qatarensa',
    'Queniana',
    'Romena',
    'Ruandêsa',
    'Russa',
    'Salvadorenha',
    'Santa-lucensa',
    'São-cristovensa',
    'São-vicentina',
    'Saudita',
    'Sérvia',
    'Síria',
    'Somala',
    'Sueca',
    'Suíça',
    'Sul-africana',
    'Sul-coreana',
    'Surinamêa',
    'Tailandêa',
    'Timorense, maubera',
    'Trindadensa',
    'Turca',
    'Ucraniana',
    'Ugandensa',
    'Uruguaia',
    'Venezuelana',
    'Vietnamita',
    'Zimbabuensa'
  ];

  estadocivil = [
    'Solteiro',
    'Casado',
    'Viúvo',
    'Separado judicialmente',
    'Divorciado'
  ].sort();

  //#endregion

  //#region construtor
  constructor(
    private router: Router,
    public cadastro: Cadastro,
    public inscmunservice: InscricaomunicipalService,
    private _snackBar: MatSnackBar,
    private serviceCampos: AvisocamposService,
    private logado: LogadoService,
    public local: Localmulta,
    public buscacepService: BuscacepService,
    private validacpf: ValidacpfService,
    private aberturaservice: AberturaService,
    private abertura: Abertura
  ) { }
  //#endregion

  @ViewChild('submitButton', { static: true }) submitButton;
  ngOnInit() {
    this.cadastro = new Cadastro();
    this.local = new Localmulta();
    this.abertura = new Abertura();

    this.logado.currentMessage.subscribe(user => {
      this.usuario = user.nome;
      (user.link) ? this.link = user.link.replace('open', 'uc') : this.link = '';
      this.cadastro.agenterespcadastro = user.nome;
    });
  }

  onfocusProcesso() {
    this.processo = '';
    this.listenprocesso = false;
    this.listenpreenchimento = false;
    this.limpaCampo();
  }

  onProcesso() {
    if (typeof this.processo !== 'undefined') {
      if (this.processo.length === 14) {
        this.listenprocesso = true;
      }
    }
  }

    onMotivo() {
    this.autorizado = true;
    if (this.motivo === 'Abertura') {
      this.exibicao = 1;
    }

    if (this.motivo === 'Consulta') {
      this.exibicao = 2;
    }

    if (this.motivo === 'Doação') {
      this.exibicao = 3;
    }

    if (this.motivo === 'Entrega') {
      this.exibicao = 4;
    }

    if (this.motivo === 'Atendimento') {
      this.exibicao = 5;
    }

    if (this.motivo === 'Recurso') {
      this.exibicao = 6;
    }

  }

  onAutorizado(value: any) {
    if (value === true) {
      this.onAutorizadotipo = 1;
    } else {
      this.onAutorizadotipo = 2;
    }
  }

  onCPF(cpf) {
    const res = this.validacpf.TestaCPF(cpf);
    if (res === false) {
      this.cadastro.cpf = 'CPF INVÁLIDO';
    } else {
      this.onIdentificado();
      this.listenpreenchimento = true;
    }
  }

  onIdentificado() {
    this.logado.currentMessage.subscribe(user => {
      this.abertura.cpf = this.cadastro.cpf;
      this.abertura.nome = this.cadastro.nome;
      this.abertura.agenterespcadastro = user.nome;
      this.abertura.processo = this.processo;
      this.aberturaservice.atualizarAbertura(this.abertura);
      this.abertura.autorizado = this.listenautorizado;

      if (this.onAutorizadotipo === 1) {
        this.abertura.autorizado = true;
      } else {
        this.abertura.autorizado = false;
      }
    });
  }

  changeEvent() {
    this.submitButton.focus();
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

  openSnackBarCampos() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    this._snackBar.openFromComponent(AvisocamposComponent, config);
  }

  gerarData() {
    const data = Date.now();
    const dateMoment = moment(data);
    return dateMoment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
  }

  gerarMomentData(date) {
    const dateMoment = moment(date);
    return dateMoment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
  }

  buscaNotificado(value) {
    if (value && value.length === 8) {
      this.inscmunservice.buscarCadastro(value).subscribe(resp => {
        this.cadastro = resp.body;
        this.onIdentificado();
        this.listenpreenchimento = true;
      }, () => this.cadastro.nome = 'Inscrição Municipal inexistente'
      );
    } else {
      this.cadastro.nome = 'A matrícula tem 8 dígitos e foram digitados ' + value.length;
    }
  }

  limpaCampo() {
    this.cadastro = new Cadastro();
    this.local = new Localmulta();
    this.cadastro.motivo = this.motivo;
  }

  ngOnDestroy(): void {
    this.serviceCampos.mudarAviso(1);
  }

}
