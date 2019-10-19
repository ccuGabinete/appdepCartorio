import { Injectable, Component } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OpensnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBarCampos(component?: ComponentType<unknown>, duration?: number, position?: MatSnackBarVerticalPosition) {
    const config = new MatSnackBarConfig();
    (duration) ? config.duration = duration : config.duration = 5000;
    (position) ? config.verticalPosition = position : config.verticalPosition = 'top';
    this._snackBar.openFromComponent(component, config);
  }
}
