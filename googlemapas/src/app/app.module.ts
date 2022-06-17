import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GoogleMapaComponent } from './components/google-mapa/google-mapa.component';


const config: SocketIoConfig = {
  url: environment.wsUrl, options:{
  }
};

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapaComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
