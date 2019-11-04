import { EntregaComponent } from './views/views/entrega/entrega.component';
import { DescarteComponent } from './views/views/descarte/descarte.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DadosComponent } from './dados/dados.component';
import { HomeComponent } from './home/home.component';
import { ConsultaComponent } from './views/views/consulta/consulta.component';
import { AberturaComponent } from './views/views/abertura/abertura.component';
import { DoacaoComponent } from './views/views/doacao/doacao.component';
import { RecursoComponent } from './views/views/recurso/recurso.component';
import { DespachosComponent } from './views/views/despachos/despachos.component';

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
    path: 'doacao',
    component: DoacaoComponent
  },
  {
    path: 'abertura',
    component: AberturaComponent
  },
  {
    path: 'descarte',
    component: DescarteComponent
  },
  {
    path: 'entrega',
    component: EntregaComponent
  },
  {
    path: 'recurso',
    component: RecursoComponent
  },
  {
    path: 'despachos',
    component: DespachosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
