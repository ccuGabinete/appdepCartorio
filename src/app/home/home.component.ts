import { Subscription } from 'rxjs';
import { LoginService } from './../services/acesso/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBarConfig } from '@angular/material';
import { LogadoService } from '../services/logado/logado.service';
import { Usuario } from '../models/usuario/usuario';
import { AvisocamposComponent } from '../avisocampos/avisocampos.component';
import { AvisocamposService } from '../services/avisocampos/avisocampos.service';
import { OpensnackbarService } from '../views/services/opensnackbar/opensnackbar.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LoginService]
})

export class HomeComponent implements OnInit {

  headers: string[];
  nome: string;
  link: string;

  constructor(
    private router: Router,
    public usuario: Usuario,
    public login: LoginService,
    private logado: LogadoService,
    private serviceCampos: AvisocamposService,
    private opensnack: OpensnackbarService
  ) { }

  observer: Subscription;
  durationInSeconds = 225;

  @ViewChild('submitButton', { static: true }) submitButton;


  ngOnInit(): void {
    this.usuario.login = '';
    this.usuario.senha = '';
  }

  changeEvent() {
    this.submitButton.focus();
  }



  onSubmit() {
    if (!this.usuario.login || !this.usuario.senha) {
      this.serviceCampos.mudarAviso(6);
      this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
    } else {

      this.login.getUser(this.usuario)
        .subscribe(res => {
          const user = new Usuario();
          if (res.body.setor === 'autos' || res.body.setor === 'gabinete') {
            user.nome = res.body.nome;
            user.link = res.body.link;
            this.logado.mudarUsuario(user);
            this.router.navigateByUrl('dados');
          } else {
            this.serviceCampos.mudarAviso(5);
            this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
          }
        },

          () => {
            this.serviceCampos.mudarAviso(4);
            this.opensnack.openSnackBarCampos(AvisocamposComponent, 2000);
          }

        );

    }
  }
}
