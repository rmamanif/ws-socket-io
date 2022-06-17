import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { AppRoutingModule } from './app-routing.module';
import { MapaComponent } from './components/mapa/mapa.component';


const config: SocketIoConfig = {
  url: environment.wsUrl, options:{

  }
};


@NgModule({
  declarations: [
    AppComponent,
    GraficaComponent,
    EncuestaComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    NgChartsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
