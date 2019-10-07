import { Abertura } from './../models/abertura/abertura';
import { ValidacpfService } from './../services/validacpf/validacpf.service';
import { SalvarcadastroService } from './../services/salvarcadastro/salvarcadastro.service';
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
const googleUrl = 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=https://https://ccuapi.herokuapp.com/resposta/';


@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})

export class DadosComponent implements OnInit, OnDestroy {

  //#region variaveis
  nome: string;
  usuario: string;
  link: string;
  panelOpenState = false;
  base64Image: string;
  options = {
    types: ['geocode'],
    componentRestrictions: { country: 'BR' },
    location: [-22.921712, -43.449187]
  };
  autorizado: boolean;
  onAutorizadotipo = 0;
  exibicao = 0;
  opcoes = [
    'Abertura',
    'Consulta',
    'Recurso',
    'Entrega',
    'Doação',
    'Outros',
    'Reunião'
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
    private pdfservice: PdfService,
    private salvarnotificado: SalvarcadastroService,
    private validacpf: ValidacpfService,
    public abertura: Abertura
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

  onMotivo(value) {
    this.autorizado = true;
    if (this.cadastro.motivo === 'Abertura') {
      this.exibicao = 1;
    }

    if (this.cadastro.motivo === 'Consulta') {
      this.exibicao = 2;
    }

    if (this.cadastro.motivo === 'Doação') {
      this.exibicao = 3;
    }

    if (this.cadastro.motivo === 'Entrega') {
      this.exibicao = 4;
    }

    if (this.cadastro.motivo === 'Outros') {
      this.exibicao = 5;
    }

    if (this.cadastro.motivo === 'Recurso') {
      this.exibicao = 6;
    }

    if (this.cadastro.motivo === 'Reunião') {
      this.exibicao = 7;
    }


  }

  onAutorizado(value: string) {
    if (value === 'sim') {
      this.onAutorizadotipo = 1;
    } else {
      this.onAutorizadotipo = 2;
    }
  }

  onCPF(cpf) {
    const res = this.validacpf.TestaCPF(cpf);
    if (res === false) {
      this.cadastro.cpf = 'CPF INVÁLIDO';
    }
  }

  // downloadPDF() {
  //   this.pdfservice.downloadPDF(this.notificado);
  // }



  // onSubmit() {
  //   if (this.testaCampos()) {

  //     this.logado.currentMessage.subscribe(user => {
  //       this.notificado.data = this.gerarData();
  //       this.notificado.dataInfracao = this.gerarMomentData(this.notificado.dataInfracao);
  //       this.notificado.dataacao = this.gerarMomentData(this.notificado.dataacao);
  //       this.notificado.agenterespcadastro = user.nome;
  //       this.salvarnotificado.buscarCadastro().subscribe(data => {

  //         this.notificado.notificacao = data.body.total + 2007;
  //         this.notificado.notificacao = this.notificado.notificacao.toString();

  //         if (!this.notificado.complemento) {
  //           this.notificado.complemento = '';
  //         }
  //         this.notificado.dataTexto = this.pdfservice.getDataExtenso(this.gerarData());

  //         // tslint:disable-next-line: max-line-length
  //         this.notificado.qrcode = googleUrl + this.notificado.infracao;

  //         this.salvarnotificado.salvarCadastro(this.notificado).subscribe(() => {
  //           this.downloadPDF();
  //         }, error => this.serviceCampos.mudarAviso(4)
  //         );
  //       });
  //     });
  //   } else {
  //     this.serviceCampos.mudarAviso(2);
  //     this.openSnackBarCampos();
  //   }
  // }

  // testaCampos(): boolean {
  //   if (
  //     !this.notificado.matricula ||
  //     !this.notificado.nome ||
  //     !this.notificado.endereco ||
  //     !this.notificado.numero ||
  //     !this.notificado.municipio ||
  //     !this.notificado.bairro ||
  //     !this.notificado.cep ||
  //     !this.notificado.infracao ||
  //     !this.notificado.dataInfracao ||
  //     !this.notificado.dataacao ||
  //     !this.notificado.localacao ||
  //     !this.notificado.bairroacao ||
  //     !this.notificado.pontos
  //   ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

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
      }, () => this.cadastro.nome = 'Inscrição Municipal inexistente'
      );
    } else {
      this.cadastro.nome = 'A matrícula tem 8 dígitos e foram digitados ' + value.length;
    }
  }

  limpaCampo() {
    this.cadastro = new Cadastro();
    this.local = new Localmulta();
  }

  public handleAddressChange(address: any) {
      this.abertura.localapreensao = address.address_components[0].long_name;
  }

  public handleAddressChangeCep(address: any) {
    // tslint:disable-next-line: prefer-const
    let cep = address.address_components[0].long_name;
    this.buscacepService.buscarCEP(cep).subscribe(data => {
      this.abertura.cep = data.body.cep;
      this.abertura.endereco = data.body.logradouro;
      this.abertura.municipio = data.body.localidade;
      this.abertura.bairro = data.body.bairro;
    });
  }

  ngOnDestroy(): void {
    this.serviceCampos.mudarAviso(1);
  }

}
