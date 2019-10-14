import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Auto } from '../../models/auto/auto';
const url = 'https://gcdapi.herokuapp.com/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', observe: 'response'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BuscarautoService {

  constructor(private http: HttpClient) { }
 
  buscarAuto(auto: string): Observable<HttpResponse<Auto>> {
    return this.http.post<any>(url + 'gcd/autos/buscarAuto', { numero: auto }, {observe: 'response'})
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
