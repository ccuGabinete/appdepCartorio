import { PdfService } from './../../../services/pdf/pdf.service';
import { FormatacoesService } from './../../services/formatacoes/formatacoes.service';
import { GerardataService } from './../../services/gerardata/gerardata.service';
import { AvisocamposComponent } from './../../../avisocampos/avisocampos.component';
import { SalvardoacaoService } from './../../services/salvardoacao/salvardoacao.service';
import { BuscacepService } from './../../../services/buscacep/buscacep.service';
import { Instituicao } from './../../models/instituicao/instituicao';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { AberturaService } from './../../services/abertura/abertura.service';
import { Abertura } from './../../models/abertura/abertura';
import { BuscalacreService } from './../../services/buscalacre/buscalacre.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { isCnpj } from 'validator-brazil';
import { AvisocamposService } from '../../../services/avisocampos/avisocampos.service';
import { OpensnackbarService } from '../../services/opensnackbar/opensnackbar.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-doacao',
  templateUrl: './doacao.component.html',
  styleUrls: ['./doacao.component.scss']
})
export class DoacaoComponent implements OnInit {

  cadastrarinstituicao: boolean;
  textoescolha: string;
  mask = true;
  cnpj = false;
  disabled = false;
  imprimir = false;
  options = {
    types: ['geocode'],
    componentRestrictions: { country: 'BR' },
    location: [-22.921712, -43.449187]
  };

  constructor(
    public abertura: Abertura,
    public instituicao: Instituicao,
    private buscarLacre: BuscalacreService,
    private aberturaservice: AberturaService,
    private lowercasepipe: LowerCasePipe,
    private buscacepservice: BuscacepService,
    private titlecasepipe: TitleCasePipe,
    private salvardoacaoservice: SalvardoacaoService,
    private servicecampos: AvisocamposService,
    private opensnack: OpensnackbarService,
    private router: Router,
    private gerardataservice: GerardataService,
    private formatacoes: FormatacoesService,
    private pdfservice: PdfService
  ) { }

  ngOnInit() {
    this.instituicao = new Instituicao();
    this.abertura = new Abertura();

    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      this.abertura = abertura;
    })

    this.salvardoacaoservice.correnteInstituicao.subscribe(instituicao => {
      // Nesse ponto trago os valores iniciais da abertura de processo 
      // e faço uma consulta para trazer os valores dessa instiuição caso haja

      if (typeof instituicao.processo !== 'undefined') {
        this.instituicao = instituicao;
        this.textoescolha = 'Imprimir';
        this.cadastrarinstituicao = false;
      } else {
        this.textoescolha = 'Cadastrar';
        this.cadastrarinstituicao = true;
        this.instituicao.matricula = 'o';
        console.log(this.instituicao);
      }
      this.instituicao.codigo = '';
    })

       
  }

  onRazaoSocial() {
    this.instituicao.razaosocial = this.titlecasepipe.transform(this.instituicao.razaosocial);
    this.instituicao.cnpj = this.formatacoes.formataCNPJ(this.instituicao.cnpj);
    // apenas para teste
    this.instituicao.responsavel = this.titlecasepipe.transform(this.abertura.nome);
    this.instituicao.cpf = this.formatacoes.formataCPF(this.abertura.cpf);
    this.instituicao.processo = this.abertura.processo.toString();
    this.instituicao.data = this.gerardataservice.gerarDataHora(Date.now());
    this.cnpj = true;
  }

  onCnpj(cnpj: string) {
    if (!isCnpj(cnpj)) {
      this.mask = false;
      this.instituicao.cnpj = 'Cnpj inválido';
    } else {
      // se o cnpj for válido então
      // será permitido continuar com o cadastro da instituição
      this.instituicao.cnpj = this.formatacoes.formataCNPJ(this.instituicao.cnpj);
      this.cnpj = true;
    }
  }

  onCnpjFocus() {
    this.mask = true;
    this.instituicao.cnpj = '';
    this.instituicao = new Instituicao();
    this.cnpj = false;
    this.instituicao.responsavel = this.titlecasepipe.transform(this.abertura.nome);
    this.instituicao.cpf = this.formatacoes.formataCPF(this.abertura.cpf);
    this.instituicao.processo = this.abertura.processo.toString();
    this.instituicao.data = this.gerardataservice.gerarDataHora(Date.now());
    this.instituicao.codigo = '0';
    // this.instituicao.cnpj = '38.981.218/0001-47';
    this.cnpj = true;
  }

  handleAddressChangeCep(address: any) {
    const cep = address.address_components[0].long_name;
    this.buscacepservice.buscarCEP(cep).subscribe(data => {
      this.instituicao.cep = data.body.cep;
      this.instituicao.endereco = data.body.logradouro;
      this.instituicao.municipio = data.body.localidade;
      this.instituicao.bairro = data.body.bairro;
    });
  }

  onCodigo() {
    this.imprimir = true;
    this.buscarLacre.arrayAtual.subscribe((arr) => {
      this.instituicao.lacres = [];
      this.buscarLacre.filtrarPorCodigp(arr, this.instituicao.codigo).forEach(t => {
        this.instituicao.lacres.push(t);
      });
    })

    
  }

  onCodigoFocus() {
    this.instituicao.codigo = '';
    this.imprimir = false;
  }

  onImprimir() {
    this.disabled = true;
    this.instituicao.codigo = this.lowercasepipe.transform(this.instituicao.codigo);
    this.salvardoacaoservice.atualizarInstituicao(this.instituicao.codigo, this.instituicao.id).subscribe(data => {
      this.pdfservice.downloadPDFDoacao(this.instituicao);
      this.refresh();
    });
  }

  testaCampos() {
    if (
      typeof this.instituicao.responsavel === 'undefined' ||
      typeof this.instituicao.cpf === 'undefined' ||
      typeof this.instituicao.cnpj === 'undefined' ||
      typeof this.instituicao.razaosocial === 'undefined' ||
      typeof this.instituicao.cep === 'undefined' ||
      typeof this.instituicao.numero === 'undefined'
    ) {
      this.servicecampos.mudarAviso(2);
      this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
      return false;
    } else {
      if (typeof this.instituicao.complemento === 'undefined' || this.instituicao.complemento === '') {
        this.instituicao.complemento = '0';
      }
      return true;
    }
  }

  onSubmit() {
    if (this.testaCampos()) {
      if(typeof this.instituicao.matricula === 'undefined') {
        this.instituicao.matricula = 'o';
      }
      this.disabled = true;
      this.instituicao.cep = this.formatacoes.formataCEP(this.instituicao.cep);
      this.salvardoacaoservice.salvarInstituicao(this.instituicao).subscribe(() => {
        this.instituicao = new Instituicao();
        this.disabled = false;
        this.servicecampos.mudarAviso(3);
        this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
        this.refresh();
      }, error => {
        this.disabled = false;
        this.servicecampos.mudarAviso(4);
        this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
      });
    }
  }

  refresh(): void {
    this.router.navigateByUrl('/doacao', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
      this.instituicao = new Instituicao();
    });
  }
}
