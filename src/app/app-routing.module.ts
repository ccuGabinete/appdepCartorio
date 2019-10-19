import { CommonModule } from '@angular/common';
import { AberturaComponent } from './views/views/abertura/abertura.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { DadosComponent } from './dados/dados.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dados',
    component: DadosComponent
  },
  {
    path: 'abertura',
    component: AberturaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
