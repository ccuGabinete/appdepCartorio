import { Grupo } from './models/grupo/grupo';
import { Instituicao } from './views/models/instituicao/instituicao';
import { ProcessoService } from './views/services/processo/processo.service';
import { OpensnackbarService } from './views/services/opensnackbar/opensnackbar.service';
import { FormatacoesService } from './views/services/formatacoes/formatacoes.service';
import { GerardataService } from './views/services/gerardata/gerardata.service';
import { GeracodigoService } from './views/services/geracodigo/geracodigo.service';
import { AberturaService } from './views/services/abertura/abertura.service';
import { AberturaComponent } from './views/views/abertura/abertura.component';
import { Cadastro } from './models/cadastro/cadastro';
import { BuscacepService } from './services/buscacep/buscacep.service';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { InscricaomunicipalService } from './services/inscricaomunicipal/InscricaomunicipalService';
import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DadosComponent } from './dados/dados.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { LoginService } from './services/acesso/login.service';
import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AvisocamposService } from './services/avisocampos/avisocampos.service';
import { AvisocamposComponent } from './avisocampos/avisocampos.component';
import { LogadoService } from './services/logado/logado.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Usuario } from './models/usuario/usuario';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { PdfService } from './services/pdf/pdf.service';
import { ConsultaComponent } from './views/views/consulta/consulta.component';
import { DoacaoComponent } from './views/views/doacao/doacao.component';
import { EntregaComponent } from './views/views/entrega/entrega.component';
import { RecursoComponent } from './views/views/recurso/recurso.component';
import { Abertura } from './views/models/abertura/abertura';
import { TitleCasePipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Lacre } from './views/models/lacre/lacre';
import { Auto } from './views/models/auto/auto';
import { BuscarautoService } from './views/services/buscarauto/buscarauto.service';
import { SalvarlacreService } from './views/services/salvarlacre/salvarlacre.service';
import { ClipboardModule } from 'ngx-clipboard';
import { DescarteComponent } from './views/views/descarte/descarte.component';
import { DespachosComponent } from './views/views/despachos/despachos.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    AberturaComponent,
    AppComponent,
    DadosComponent,
    HomeComponent,
    AvisocamposComponent,
    ConsultaComponent,
    DoacaoComponent,
    EntregaComponent,
    RecursoComponent,
    DescarteComponent,
    DespachosComponent
  ],
  imports: [
    ClipboardModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    GooglePlaceModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    Instituicao,
    ProcessoService,
    OpensnackbarService,
    FormatacoesService,
    GerardataService,
    GeracodigoService,
    SalvarlacreService,
    Grupo,
    Auto,
    BuscarautoService,
    Lacre,
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    Abertura,
    AberturaService,
    Cadastro,
    PdfService,
    LoginService,
    AvisocamposService,
    LogadoService,
    Usuario,
    MatDatepickerModule,
    InscricaomunicipalService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    BuscacepService
  ],
  bootstrap: [AppComponent],
  exports: [
    AvisocamposComponent
  ],
  entryComponents: [
    AvisocamposComponent
  ]

})
export class AppModule { }
