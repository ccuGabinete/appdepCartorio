import { ProcessoService } from './../views/services/processo/processo.service';
import { BuscalacreService } from './../views/services/buscalacre/buscalacre.service';
import { AberturaService } from './../views/services/abertura/abertura.service';
import { Subscription } from 'rxjs';
import { ValidacpfService } from './../services/validacpf/validacpf.service';
import { BuscacepService } from './../services/buscacep/buscacep.service';
import { InscricaomunicipalService } from '../services/inscricaomunicipal/InscricaomunicipalService';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LogadoService } from '../services/logado/logado.service';
import { AvisocamposService } from '../services/avisocampos/avisocampos.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario/usuario';
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
  sexo: string;
  panelOpenState = false;
  base64Image: string;
  options = {
    types: ['geocode'],
    componentRestrictions: { country: 'BR' },
    location: [-22.921712, -43.449187]
  };
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
    private serviceCampos: AvisocamposService,
    private logado: LogadoService,
    public buscacepService: BuscacepService,
    private validacpf: ValidacpfService,
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
      case 'Doação': {
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
  onMatricula() {
    this.cadastro.matricula = null;
    this.cadastro.nome = null;
    this.cadastro.autorizado = null;
    this.cadastro.concessao = null;
    this.cadastro.cpf = null;
    this.cadastro.equipamento = null;
    this.cadastro.isento = null;
    this.cadastro.local = null;
    this.cadastro.matricula = null;
    this.cadastro.nomeaux = null;
    this.cadastro.cpfaux = null;
    this.cadastro.numero = null;
    this.cadastro.documento = null;
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
