import { Viewescolha } from './views/models/viewescolha';
import { EscolhaService } from './views/services/escolha/escolha.service';
import { AtendimentoComponent } from './views/views/atendimento/atendimento.component';
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

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DadosComponent } from './dados/dados.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from './services/acesso/login.service';
import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertaComponent } from './alerta/alerta.component';
import { SucessoService } from './services/sucesso/SucessoService';
import { Aviso } from './models/aviso/aviso';
import { AvisocamposService } from './services/avisocampos/avisocampos.service';
import { AvisosalvarService } from './services/avisosalvar/avisosalvar.service';
import { Avisocamposmodel } from './models/avisoscamposmodel/avisocamposmodel';
import { Avisosalvarmodel } from './models/avisosalvarmodel/avisosalvarmodel';
import { AvisocamposComponent } from './avisocampos/avisocampos.component';
import { LogadoService } from './services/logado/logado.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Usuario } from './models/usuario/usuario';
import { Notificado } from './models/notificado/notificado';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { Localmulta } from './models/localmulta/localmulta';
import { PdfService } from './services/pdf/pdf.service';
import { ValidacpfService } from './services/validacpf/validacpf.service';
import { ConsultaComponent } from './views/views/consulta/consulta.component';
import { DoacaoComponent } from './views/views/doacao/doacao.component';
import { EntregaComponent } from './views/views/entrega/entrega.component';
import { RecursoComponent } from './views/views/recurso/recurso.component';
import { Abertura } from './views/models/abertura/abertura';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    AberturaComponent,
    AppComponent,
    AtendimentoComponent,
    DadosComponent,
    HomeComponent,
    AlertaComponent,
    AvisocamposComponent,
    ConsultaComponent,
    DoacaoComponent,
    EntregaComponent,
    RecursoComponent
  ],
  imports: [
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
    Viewescolha,
    EscolhaService,
    Abertura,
    ValidacpfService,
    Cadastro,
    PdfService,
    Localmulta,
    Aviso,
    LoginService,
    SucessoService,
    AvisocamposService,
    AvisosalvarService,
    Avisosalvarmodel,
    Avisocamposmodel,
    LogadoService,
    Usuario,
    Notificado,
    MatDatepickerModule,
    InscricaomunicipalService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    BuscacepService
  ],
  bootstrap: [AppComponent],
  exports: [
    AlertaComponent,
    AvisocamposComponent
  ],
  entryComponents: [
    AlertaComponent,
    AvisocamposComponent
  ]

})
export class AppModule { }
