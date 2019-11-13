import { Router } from '@angular/router';
import { SalvaratendimentoService } from './../../services/salvaratendimento/salvaratendimento.service';
import { OpensnackbarService } from './../../services/opensnackbar/opensnackbar.service';
import { FormatacoesService } from './../../services/formatacoes/formatacoes.service';
import { GerardataService } from './../../services/gerardata/gerardata.service';
import { SalvarlacreService } from './../../services/salvarlacre/salvarlacre.service';
import { BuscalacreService } from './../../services/buscalacre/buscalacre.service';
import { PdfService } from './../../../services/pdf/pdf.service';
import { AberturaService } from './../../services/abertura/abertura.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InscricaomunicipalService } from '../../../services/inscricaomunicipal/InscricaomunicipalService';
import { AvisocamposService } from '../../../services/avisocampos/avisocampos.service';
import { BuscacepService } from '../../../services/buscacep/buscacep.service';
import { AvisocamposComponent } from '../../../avisocampos/avisocampos.component';
import { Abertura } from '../../models/abertura/abertura';
import { Lacre } from '../../models/lacre/lacre';
import { BuscarautoService } from '../../services/buscarauto/buscarauto.service';
import { Auto } from '../../models/auto/auto';

@Component({
  selector: 'app-abertura',
  templateUrl: './abertura.component.html',
  styleUrls: ['./abertura.component.scss']
})
export class AberturaComponent implements OnInit, OnDestroy {

  //#region variaveis
  processo: string;
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

  homem = [
    'Solteiro',
    'Casado',
    'Viúvo',
    'Separado',
    'Divorciado'
  ];

  mulher = [
    'Solteira',
    'Casada',
    'Viúva',
    'Separada',
    'Divorciada'
  ];

  estadocivil: Array<string>;
  listalacres: Array<Lacre> = [];
  listaAutos: Array<Auto> = [];
  listaTRM = [];
  listaMetro = [];
  objlacre: string;
  comprobatorio = '';
  docs = [
    'Auto',
    'TRM',
    'Lacre',
    'Metrô',
    'Nenhum'
  ];
  disabled = false;

  //#endregion

  //#region construtor
  constructor(
    public inscmunservice: InscricaomunicipalService,
    private serviceCampos: AvisocamposService,
    public buscacepService: BuscacepService,
    public abertura: Abertura,
    private aberturaservice: AberturaService,
    private pdfservice: PdfService,
    private buscalacre: BuscalacreService,
    public lacre: Lacre,
    public auto: Auto,
    public buscarauto: BuscarautoService,
    private salvarlacre: SalvarlacreService,
    private gerardata: GerardataService,
    private formata: FormatacoesService,
    private opensnack: OpensnackbarService,
    private salvaratendimento: SalvaratendimentoService,
    private router: Router
  ) { }
  //#endregion

  @ViewChild('submitButton', { static: true }) submitButton;
  ngOnInit() {
    this.abertura = new Abertura();
    this.lacre = new Lacre();
    this.auto = new Auto();
    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      this.abertura = abertura;
      if (this.abertura.sexo) {
        this.estadocivil = this.mulher;
      } else {
        this.estadocivil = this.homem;
      }
    });
  }

  changeEvent() {
    this.submitButton.focus();
  }

  testaCampo(abertura: Abertura): boolean {
    let response: boolean;

    if (
      typeof abertura.autorizado !== 'undefined' &&
      typeof abertura.bairro !== 'undefined' &&
      typeof abertura.cep !== 'undefined' &&
      typeof abertura.cpf !== 'undefined' &&
      typeof abertura.endereco !== 'undefined' &&
      typeof abertura.estadocivil !== 'undefined' &&
      typeof abertura.dataexpedicao !== 'undefined' &&
      typeof abertura.identidade !== 'undefined' &&
      typeof abertura.itensdiscriminados !== 'undefined' &&
      typeof abertura.localapreensao !== 'undefined' &&
      typeof abertura.dataapreensao !== 'undefined' &&
      typeof abertura.matricula !== 'undefined' &&
      typeof abertura.municipio !== 'undefined' &&
      typeof abertura.nacionalidade !== 'undefined' &&
      typeof abertura.nome !== 'undefined' &&
      typeof abertura.numero !== 'undefined'

    ) {

      if (typeof abertura.complemento === 'undefined') {
        abertura.complemento = '';
      }

      if (typeof abertura.telresidencial === 'undefined') {
        abertura.telresidencial = '';
      }

      if (typeof abertura.telcelular === 'undefined') {
        abertura.telcelular = '';
      }

      if (typeof abertura.email === 'undefined') {
        abertura.email = '';
      }

      response = true;
    } else {
      this.serviceCampos.mudarAviso(2);
      this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
      response = false;
    }
    return response;
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
      this.abertura.matricula = abertura.matricula;
      this.abertura.equipamento = abertura.equipamento;
      this.abertura.localequipamento = abertura.localequipamento;
      this.abertura.motivo = abertura.motivo;
    });
  }

  onEmail() {
    this.abertura.telcelular = this.telcelformatado;
    this.abertura.telresidencial = this.telcelformatado;
  }

  onAuto(numerodoauto) {
    this.buscarauto.buscarAuto(numerodoauto).subscribe(data => {
      this.auto = data.body;

      // caso o auto seja encontrado será carregado o array de lacres
      // pertencentes a esse
      if (data.body.pos !== '') {
        const response = this.buscarauto.filtraPosicao(this.auto);
        response.forEach(t => {

          // aqui nesse ponto indexa o número de processo a esses lacres
          t.processo = this.abertura.processo.toString();
          this.listalacres.push(t);
        });
      } else {
        // Se esse auto ainda não deu entrada no PF
        // entao, fixa valores default de numero e pos
        // e não reetorna nenhum lacre
        this.auto.numero = this.abertura.autodeapreensao;
        this.auto.pos = '0000';
      }

      // sempre será inserido o número do auto na listaautos

      this.listaAutos.push(this.auto);
      this.abertura.autodeapreensao = '';

    });
  }

  onLacre(val: string) {
    this.abertura.lacre = this.formata.colocaZeros(this.abertura.lacre);
    val = this.formata.colocaZeros(val);
    this.buscalacre.arrayAtual.subscribe(arr => {
      // busca o lacre nos array de lacres
      // e caso não exista delimita valores default para o mesmo
      // e adiciona a this.listaLacres
      const response = this.buscalacre.filtrarPorLacre(arr, val);
      if (response.length === 0) {
        const lacre = new Lacre();
        lacre.numero = val;
        lacre.data = this.gerardata.gerarData(true);
        lacre.pos = '0000';
        lacre.auto = '0';
        lacre.trm = '0';
        lacre.grupo = '00';
        lacre.quantidade = '0000';
        lacre.recebedor = '0';
        response.push(lacre);
        lacre.processo = this.abertura.processo.toString();
      }

      response.forEach(t => {
        this.listalacres.push(t);
      });

      this.abertura.lacre = '';
    });
  }

  onFocusLacre() {
    this.abertura.lacre = '';
  }

  onMetro(val: string) {
    this.abertura.metro = this.formata.colocaZeros(this.abertura.metro);
    this.listaMetro.push(this.abertura.metro);
    this.abertura.metro = '';
  }

  onFocusMetro() {
    this.abertura.metro = '';
  }

  onFocusAuto() {
    this.abertura.autodeapreensao = '';
  }

  onDeletar(obj) {
    const index = this.listalacres.findIndex(lacre => lacre.numero === obj.numero);
    this.listalacres.splice(index, 1);
  }

  onTRM() {
    this.abertura.trm = this.formata.colocaZeros(this.abertura.trm);
    this.listaTRM.push(this.abertura.trm);
    this.abertura.trm = '';
  }

  onFocusTRM() {
    this.abertura.trm = '';
  }

  onDeletarTRM(trm: string) {
    const index = this.listaTRM.indexOf(trm);
    this.listaTRM.splice(index, 1);
  }

  onDeletarAuto(auto: Auto) {
    const index = this.listaAutos.findIndex(x => x.numero === auto.numero);
    this.listaAutos.splice(index, 1);

    const filterLacre = (lacre) => {
      return lacre.pos !== auto.pos;
    };

    this.listalacres = this.listalacres.filter(filterLacre);
    this.abertura.autodeapreensao = '';
  }

  onDeletarMetro(metro: string) {
    const index = this.listaMetro.indexOf(metro);
    this.listaMetro.splice(index, 1);
  }

  onComprobatorio() {
    this.listaAutos = [];
    this.listaTRM = [];
    this.listalacres = [];
    this.listaMetro = [];
    this.objlacre = '';
  }

  // função sem uso definido aguardando exclusão
  populaListas() {
    this.abertura.listalacres = '';
    this.abertura.listaautos = '';
    this.abertura.listaMetro = this.listaMetro.toString();
    this.abertura.listatrms = this.listaTRM.toString();

    this.listalacres.forEach((lacre, pos, array) => {
      if (pos !== array.length - 1) {
        this.abertura.listalacres += lacre.numero + ' - ';
      } else {
        this.abertura.listalacres += lacre.numero;
      }
    });

    this.listaAutos.forEach((auto, pos, array) => {
      if (pos !== array.length - 1) {
        this.abertura.listaautos += auto.numero + ' - ';
      } else {
        this.abertura.listaautos += auto.numero;
      }
    });

  }


  onAtendimento() {

  }

  onSubmit() {
    if (this.testaCampo(this.abertura)) {
      this.populaitensComporbatorios();
      this.disabled = true;

      this.abertura.dataexpedicao = this.gerardata.gerarMomentData(this.abertura.dataexpedicao);
      this.abertura.dataapreensao = this.gerardata.gerarMomentData(this.abertura.dataapreensao);
      this.abertura.dataabertura = this.gerardata.gerarMomentData(this.abertura.dataabertura);

      this.salvaratendimento.salvarAtendimento(this.abertura).subscribe(() => {
        this.serviceCampos.mudarAviso(3);
        this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
        this.onEnviaLacres();
        this.pdfservice.downloadPDF(this.abertura);
        this.pdfservice.pdfavisocorrente.subscribe(() => {
          setTimeout(() => {
            this.disabled = false;
            this.refresh();
          }, 4000);
        });
      },
        () => {
          this.disabled = false;
          this.serviceCampos.mudarAviso(4);
          this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
        });
    }
  }

  // função rsponsável por salvar e/ou atualizar os lacres
  onEnviaLacres() {
    const arrenvio = this.salvarlacre.converteParaPlanilhaExcel(this.listalacres);
    arrenvio.forEach(obj => {
      if (obj.pos !== '0000') {
        this.salvarlacre.atualizarLacre(obj).subscribe(data => {
        }, () => {
          this.serviceCampos.mudarAviso(4);
          this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
        });

      } else {
        this.salvarlacre.salvarLacre(obj).subscribe(data => {
        });
      }
    }, () => {
      this.serviceCampos.mudarAviso(4);
      this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
    });
  }

  // função responsável por atribuir os valores de autos, lacres e trms para
  // serem usados pelo servico pdf.service
  populaitensComporbatorios() {
    this.abertura.listatrms = this.listaTRM.toString();
    this.abertura.listaMetro = this.listaMetro.toString();
    this.abertura.listaautos = '';
    this.abertura.listalacres = '';
    this.listaAutos.forEach((t, p, a) => {
      if (p !== a.length - 1) {
        if (t.pos !== '0000') {
          this.abertura.listaautos += t.numero + '(' + t.pos + ')' + ',';
        } else {
          this.abertura.listaautos += t.numero + ',';
        }
      } else {
        if (t.pos !== '0000') {
          this.abertura.listaautos += t.numero + '(' + t.pos + ')';
        } else {
          this.abertura.listaautos += t.numero;
        }
      }

    });

    this.listalacres.forEach((t, p, a) => {
      if (p !== a.length - 1) {
        this.abertura.listalacres += t.numero + ',';
      } else {
        this.abertura.listalacres += t.numero;
      }

    });
  }

  refresh(): void {
    this.router.navigateByUrl('/abertura', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
    });
  }

  ngOnDestroy(): void {
    this.serviceCampos.mudarAviso(1);
  }
}
