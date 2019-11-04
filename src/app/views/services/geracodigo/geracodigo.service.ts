import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Abertura } from '../../models/abertura/abertura';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const url = 'https://gcdapi.herokuapp.com/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class GeracodigoService {

  constructor(private http: HttpClient) {}

  enviarCodigo(): Observable<HttpResponse<any>> {
    return this.http.get<any>(url + 'gcd/email/enviar', { observe: 'response' })
      .pipe(catchError(this.handleError));
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
