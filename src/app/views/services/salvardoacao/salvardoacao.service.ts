import { Instituicao } from './../../models/instituicao/instituicao';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GerardataService } from '../gerardata/gerardata.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const url = 'https://gcdapi.herokuapp.com/';
const local = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SalvardoacaoService {

  constructor(private http: HttpClient, private gd: GerardataService) { }

  salvarInstituicao(instituicao: Instituicao): Observable<HttpResponse<Instituicao>> {
    return this.http.post<Instituicao>(url + 'gcd/instituicao/salvar', instituicao, { observe: 'response' })
      .pipe(
        catchError(this.handleError));
  }

  buscarInstituicao(processo: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(url + 'gcd/instituicao/buscar', { processo: processo }, { observe: 'response' })
      .pipe(
        catchError(this.handleError));
  }

  atualizarInstituicao(codigo: string, linha: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(url + 'gcd/instituicao/atualizar', { codigo: codigo, linha: linha }, { observe: 'response' })
      .pipe(
        catchError(this.handleError));
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
