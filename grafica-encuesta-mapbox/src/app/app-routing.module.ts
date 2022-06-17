import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './components/grafica/grafica.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './components/mapa/mapa.component';

const routes: Routes = [
  {
    path: '', component:GraficaComponent
  },
  {
    path:'encuesta', component:EncuestaComponent
  },
  {
    path:'map', component:MapaComponent
  },
  {
    path:'**', component:GraficaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
