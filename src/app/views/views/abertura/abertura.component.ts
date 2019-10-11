import { BuscalacreService } from './../../services/buscalacre/buscalacre.service';
import { PdfService } from './../../../services/pdf/pdf.service';
import { AberturaService } from './../../services/abertura/abertura.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InscricaomunicipalService } from '../../../services/inscricaomunicipal/InscricaomunicipalService';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AvisocamposService } from '../../../services/avisocampos/avisocampos.service';
import { BuscacepService } from '../../../services/buscacep/buscacep.service';
import { AvisocamposComponent } from '../../../avisocampos/avisocampos.component';
import * as moment from 'moment-timezone';
import { Abertura } from '../../models/abertura/abertura';
import { Lacre } from '../../models/lacre/lacre';

@Component({
  selector: 'app-abertura',
  templateUrl: './abertura.component.html',
  styleUrls: ['./abertura.component.scss']
})
export class AberturaComponent implements OnInit, OnDestroy {

  //#region variaveis
  dataexpedicao: Date;
  dataapreensao: Date;
  telresformatado: string;
  telcelformatado: string;
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
    'Separado',
    'Divorciado'
  ].sort();

  listalacres = [];
  objlacre: string;

  //#endregion

  //#region construtor
  constructor(
    public inscmunservice: InscricaomunicipalService,
    private _snackBar: MatSnackBar,
    private serviceCampos: AvisocamposService,
    public buscacepService: BuscacepService,
    public abertura: Abertura,
    private aberturaservice: AberturaService,
    private pdfservice: PdfService,
    private buscalacre: BuscalacreService,
    public lacre: Lacre
  ) { }
  //#endregion

  @ViewChild('submitButton', { static: true }) submitButton;
  ngOnInit() {
    this.abertura = new Abertura();
    this.lacre = new Lacre();
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

  testaCampo(object: Abertura, len): boolean {
    if (
      typeof this.abertura.complemento === 'undefined'
    ) {
      len--;
    }

    if (
      typeof this.abertura.telcelular === 'undefined'
    ) {
      len--;
    }

    if (
      typeof this.abertura.telresidencial === 'undefined'
    ) {
      len--;
    }

    if (
      typeof this.abertura.email === 'undefined'
    ) {
      len--;
    }

    let count = 0;
    // tslint:disable-next-line: prefer-const
    for (let key in object) {
      if (key) {
        count++;
        console.log(key);
      }
    }
    console.log(count);

    if (count === len) {
      return true;
    }

    return false;
  }

  gerarData(bd?: boolean) {
    const data = Date.now();
    const dateMoment = moment(data);
    if (bd) {
      return dateMoment.tz('America/Sao_Paulo').format('DD/MM/YY');
    } else {
      return dateMoment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
    }

  }

  gerarMomentData(date) {
    moment.defineLocale('America/Sao_Paulo', {
      parentLocale: 'pt-BR'
    });
    const dateMoment = moment(date).format('DD/MM/YYYY');
    return dateMoment;
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

  onIdentidade() {
    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      this.abertura.cpf = abertura.cpf;
      this.abertura.nome = abertura.nome;
      this.abertura.agenterespcadastro = abertura.agenterespcadastro;
      this.abertura.autorizado = abertura.autorizado;
      this.abertura.processo = abertura.processo;
    });
  }

  onSubmit() {

    if (this.testaCampo(this.abertura, 21)) {
      if (
        typeof this.abertura.complemento === 'undefined'
        || typeof this.abertura.telcelular === 'undefined'
        || typeof this.abertura.telresidencial === 'undefined'
        || typeof this.abertura.email === 'undefined'
      ) {
        this.abertura.complemento = '';
        this.abertura.telcelular = '';
        this.abertura.telresidencial = '';
        this.abertura.email = '';
      }
      this.abertura.dataapreensao = this.gerarMomentData(this.dataapreensao);
      this.abertura.dataexpedicao = this.gerarMomentData(this.dataexpedicao);
      this.pdfservice.downloadPDF(this.abertura);
    } else {
      this.serviceCampos.mudarAviso(2);
      this.openSnackBarCampos();
    }
  }

  onEmail() {
    this.abertura.telcelular = this.telcelformatado;
    this.abertura.telresidencial = this.telcelformatado;
  }

  onAuto() {
    console.log(this.abertura.autodeapreensao);
  }

  onLacre(val: string) {
    const tamanho = val.length;
    if (tamanho < 8) {
      for (let i = 0; i < (8 - tamanho); i++) {
        val = '0' + val;
      }
    }
    this.objlacre = val;
    this.buscalacre.buscarLacre(this.objlacre).subscribe(data => {
      let obj = {};
      if (typeof data.body[0].response === 'undefined') {
        data.body.forEach(dt => {
          this.listalacres.push(dt);
        });
      } else {
        obj = {
          atualizado: this.gerarData(true),
          id: this.objlacre,
          pos: '0000',
          status: '00',
          processo: this.abertura.processo
        };
        this.listalacres.push(obj);
      }

    });
  }

  onFocusLacre() {
    this.objlacre = '';
  }

  onDeletar(obj) {
    const index = this.listalacres.findIndex(lacre => lacre.id === obj.id);
    this.listalacres.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.serviceCampos.mudarAviso(1);
  }

}
