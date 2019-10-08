import { EscolhaService } from './../../services/escolha/escolha.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Cadastro } from '../../../models/cadastro/cadastro';
import { InscricaomunicipalService } from '../../../services/inscricaomunicipal/InscricaomunicipalService';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AvisocamposService } from '../../../services/avisocampos/avisocampos.service';
import { LogadoService } from '../../../services/logado/logado.service';
import { Localmulta } from '../../../models/localmulta/localmulta';
import { BuscacepService } from '../../../services/buscacep/buscacep.service';
import { PdfService } from '../../../services/pdf/pdf.service';
import { SalvarcadastroService } from '../../../services/salvarcadastro/salvarcadastro.service';
import { ValidacpfService } from '../../../services/validacpf/validacpf.service';
import { Usuario } from '../../../models/usuario/usuario';
import { AvisocamposComponent } from '../../../avisocampos/avisocampos.component';
import * as moment from 'moment-timezone';
import { Abertura } from '../../models/abertura/abertura';

@Component({
  selector: 'app-abertura',
  templateUrl: './abertura.component.html',
  styleUrls: ['./abertura.component.scss']
})
export class AberturaComponent implements OnInit, OnDestroy {

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
  indice = 0;
  autorizado = 0;
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
    public inscmunservice: InscricaomunicipalService,
    private _snackBar: MatSnackBar,
    private serviceCampos: AvisocamposService,
    public buscacepService: BuscacepService,
    private pdfservice: PdfService,
    private salvarnotificado: SalvarcadastroService,
    private validacpf: ValidacpfService,
    public abertura: Abertura,
  ) { }
  //#endregion

  @ViewChild('submitButton', { static: true }) submitButton;
  ngOnInit() {
    this.abertura = new Abertura();
  }

  changeEvent() {
    this.submitButton.focus();
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
