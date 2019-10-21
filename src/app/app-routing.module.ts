import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DadosComponent } from './dados/dados.component';
import { HomeComponent } from './home/home.component';
import { ConsultaComponent } from './views/views/consulta/consulta.component';
import { AberturaComponent } from './views/views/abertura/abertura.component';

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
    path: 'consulta',
    component: ConsultaComponent
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
