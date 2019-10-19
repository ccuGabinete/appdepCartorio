import { GerardataService } from './../gerardata/gerardata.service';
import { Auto } from './../../models/auto/auto';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Lacre } from '../../models/lacre/lacre';
const url = 'https://gcdapi.herokuapp.com/';
const local = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class BuscalacreService {
  public arr: Array<Lacre>;
  public buscarArray = new BehaviorSubject(this.arr);
  arrayAtual = this.buscarArray.asObservable();


  constructor(private http: HttpClient, private gd: GerardataService) {
    this.arr = [];
  }

  buscarLacre(): Observable<HttpResponse<any>> {
    return this.http.get<any>(url + 'gcd/buscarLacre', { observe: 'response' })
      .pipe(
        catchError(this.handleError));
  }

  buscarPosicao(posicao: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(url + 'gcd/buscarPosicao', { pos: posicao }, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  // método que guarda o array de lacres para compartilhar com outros componentes
  atualizarArrayLacres(arr: Array<Lacre>) {
    this.buscarArray.next(arr);
  }

  // converte o array resposta vinda do servidor em um um array de objetos tipo Lacre
  converteParaArrayDeLacres(linhas: any) {

    const arr: Array<Lacre> = [];

    linhas.forEach((linha, ln) => {
      const arrlacre = linha.lacre.split(',');
      arrlacre.forEach((lc) => {
        const lacre = new Lacre();
        lacre.auto = linha.auto;
        lacre.data = this.gd.gerarData(true);
        // lacre.linha será usado para atualizar o status posteriormente
        lacre.linha = ln + 1;
        lacre.pos = linha.pos;
        lacre.processo = linha.processo;
        lacre.trm = linha.trm;
        lacre.numero = lc.substring(0, 8);
        lacre.grupo = lc.substring(9, 11);
        lacre.quantidade = lc.substring(12, 16);
        arr.push(lacre);
      });
    });

    return arr;

  }

  filtrarPorLacre(arr: Array<Lacre>, lacrenumero: string) {
    const response = arr.filter((value) => {
      return value.numero === lacrenumero;
    });
    return response;
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
