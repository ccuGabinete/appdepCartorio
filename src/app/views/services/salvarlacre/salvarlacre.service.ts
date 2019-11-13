import { Auto } from './../../models/auto/auto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lacre } from '../../models/lacre/lacre';
const url = 'https://gcdapi.herokuapp.com/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SalvarlacreService {

  constructor(private http: HttpClient) { }


  salvarLacre(lacre: Lacre): Observable<HttpResponse<Lacre>> {
    return this.http.post<Lacre>(url + 'gcd/salvar', lacre, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  atualizarLacre(lacre: Lacre): Observable<HttpResponse<Lacre>> {
    return this.http.post<Lacre>(url + 'gcd/atualizaCartorio', lacre, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  atualizaLacre(lacre: Lacre): Observable<HttpResponse<Lacre>> {
    return this.http.post<Lacre>(url + 'gcd/atualizaLacre', lacre, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }



  // devolve o array de Lacre para a planilha do google
  converteParaPlanilhaExcel(lacrearray: Array<Lacre>): Lacre[] {
    lacrearray.forEach(dado => {
      // tslint:disable-next-line: max-line-length
      dado.lacre = dado.numero + '(' + dado.status + ';' + dado.data + ';aaaa;' + dado.grupo + ';' + dado.quantidade + ';' + dado.recebedor + ')';
    });

    const posicoes = [];

    lacrearray.forEach(t => {
      if (posicoes.indexOf(t.pos) === -1) {
        posicoes.push(t.pos);
      }
    });

    const arrayenvio = [];

    posicoes.forEach((t, pos, array) => {

      let str = '';
      const aux = lacrearray.filter((v) => {
        return v.pos === t;
      });

      aux.forEach((s, p, a) => {
        if (p !== a.length - 1) {
          str += s.lacre + ',';
        } else {
          str += s.lacre;
          // tslint:disable-next-line: prefer-const
          let l = new Lacre();
          l.status = s.status;
          l.auto = s.auto;
          l.data = s.data;
          l.lacre = str;
          l.linha = s.linha;
          l.numero = s.numero;
          l.pos = s.pos;
          l.processo = s.processo;
          l.grupo = s.grupo;
          l.quantidade = s.quantidade;
          l.recebedor = s.recebedor;
          l.trm = s.trm;
          arrayenvio.push(l);
        }
      });

    });

    return arrayenvio;

  }

  criaStringLacre(dado: Lacre): string {
    // tslint:disable-next-line: max-line-length
    return dado.lacre = dado.numero + ';' + dado.status + ';' + dado.data + ';aaaa;' + dado.grupo + ';' + dado.quantidade + ';' + dado.recebedor + ')';
  }

   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
