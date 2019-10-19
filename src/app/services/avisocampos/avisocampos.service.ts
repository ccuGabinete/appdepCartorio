import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisocamposService {

  public message: number;
  public messageSource = new BehaviorSubject(this.message);
  currentMessage = this.messageSource.asObservable();

  constructor() {
    this.message = 1;
  }

  mudarAviso(aviso: number) {
    this.messageSource.next(aviso);
  }
}
