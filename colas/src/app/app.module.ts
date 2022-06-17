import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PublicTicketsComponent } from './components/public-tickets/public-tickets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendTicketComponent } from './components/attend-ticket/attend-ticket.component';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { QueueInitialComponent } from './components/queue-initial/queue-initial.component';
import { PushNotificationModule } from 'ng-push-notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
const config: SocketIoConfig ={
  url: environment.wsUrl, options:{

  }
}

@NgModule({
  declarations: [
    AppComponent,
    PublicTicketsComponent,
    AttendTicketComponent,
    NewTicketComponent,
    QueueInitialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    PushNotificationModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
