import { SalvaratendimentoService } from './../../services/salvaratendimento/salvaratendimento.service';
import { Router } from '@angular/router';
import { PdfService } from './../../../services/pdf/pdf.service';
import { BuscalacreService } from './../../services/buscalacre/buscalacre.service';
import { OpensnackbarService } from './../../services/opensnackbar/opensnackbar.service';
import { AvisocamposService } from './../../../services/avisocampos/avisocampos.service';
import { AberturaService } from './../../services/abertura/abertura.service';
import { Abertura } from './../../models/abertura/abertura';
import { SalvardoacaoService } from './../../services/salvardoacao/salvardoacao.service';
import { TitleCasePipe, LowerCasePipe } from '@angular/common';
import { Instituicao } from './../../models/instituicao/instituicao';
import { Component, OnInit } from '@angular/core';
import { AvisocamposComponent } from '../../../avisocampos/avisocampos.component';


@Component({
  selector: 'app-descarte',
  templateUrl: './descarte.component.html',
  styleUrls: ['./descarte.component.scss']
})
export class DescarteComponent implements OnInit {
  imprimir = false;
  cadastrarinstituicao: boolean;

  constructor(
    public instituicao: Instituicao,
    public abertura: Abertura,
    private title: TitleCasePipe,
    private salvardoacaoservice: SalvardoacaoService,
    private aberturaservice: AberturaService,
    private servicecampos: AvisocamposService,
    private lowercasepipe: LowerCasePipe,
    private opensnack: OpensnackbarService,
    private buscarLacre: BuscalacreService,
    private pdfservice: PdfService,
    private router: Router,
    private salvaratendimentoservice: SalvaratendimentoService
  ) { }

  ngOnInit() {
    this.abertura = new Abertura();
    this.aberturaservice.correnteAbertura.subscribe(abertura => {
      this.abertura.agenterespcadastro = abertura.agenterespcadastro;
      this.abertura.autorizado = abertura.autorizado;
      this.abertura.processo = abertura.processo;
      this.abertura.nome = abertura.nome;
      this.abertura.identidade = abertura.identidade;
      this.abertura.motivo = abertura.motivo;
      this.abertura.dataabertura = abertura.dataabertura;

      this.instituicao = new Instituicao();
      this.instituicao.razaosocial = this.title.transform('COMPANHIA MUNICIPAL DE LIMPEZA URBANA') + ' - COMLURB';
      this.instituicao.numero = '358';
      this.instituicao.complemento = 'ap-1';
      this.instituicao.bairro = 'Tijuca';
      this.instituicao.municipio = 'Rio de Janeiro';
      this.instituicao.cep = '20511900';
      this.instituicao.cnpj = '42124693000174';
      this.instituicao.endereco = 'Rua Major Ávila';
      this.instituicao.responsavel = this.title.transform(abertura.nome);
      this.instituicao.cpf = abertura.cpf;
      this.instituicao.processo = abertura.processo.toString();
      this.instituicao.codigo = '0';

      // assim que a view subir, executo o salvamento desta
      // instiução para compor a tabela de instiuções ainda que
      // o objetivo seja diferente, possui as mesmas características
      this.salvardoacaoservice.salvarInstituicao(this.instituicao).subscribe(() => {
      });
    });
  }

  onCodigo() {
    this.imprimir = true;
  }

  onFocusCodigo() {
    this.instituicao.codigo = '';
    this.imprimir = false;
  }

  onImprimir() {
    this.instituicao.codigo = this.lowercasepipe.transform(this.instituicao.codigo);
    this.instituicao.lacres = [];
    this.buscarLacre.arrayAtual.subscribe((arr) => {
      this.buscarLacre.filtrarPorCodigp(arr, this.instituicao.codigo).forEach(t => {
        this.instituicao.lacres.push(t);
      });

      if (this.instituicao.lacres.length < 1) {
        this.servicecampos.mudarAviso(8);
        this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
      } else {
        // nesse ponto caso haja lacres marcados com o código informado
        // a instituição terá seu campo codigo atualizado com o valor do código
        // e serão extraídos os lacres marcados com esse mesmo código
        this.salvardoacaoservice.buscarInstituicao(this.instituicao.processo).subscribe(data => {
          // será necessário buscar a linha {id} do processo recem salvao na planilha
          this.salvardoacaoservice.atualizarInstituicao(this.instituicao.codigo, data.body[0].id).subscribe(data => {
            this.salvaratendimentoservice.salvarAtendimento(this.abertura).subscribe(() => {
            }, error => {
              this.servicecampos.mudarAviso(4);
              this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
            });

            this.pdfservice.downloadPDFDescarte(this.instituicao);
            this.pdfservice.pdfavisocorrente.subscribe(() => {
              this.refresh();
            });
          });
        });
      }//  fim else
    });
  }

  refresh(): void {
    this.router.navigateByUrl('/descarte', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dados']);
    });
  }
}
