import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PushNotificationService } from 'ng-push-notification';
import { SocketIoConfig } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { ColasService } from './services/colas.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(
    public wsService: WebsocketService,
    public csService: ColasService,
    private toastr: ToastrService,
    private pushNotification: PushNotificationService
  ){

  }
  ngOnInit(): void {
    this.groupMessage();

  }

  title = 'colas';

  groupMessage(){
    this.csService.grupalMessage().subscribe(
      (data:any) =>{
         this.pushNotification.show(
        `El ticket N° ${data.id} está siendo \n atendido por la mesa ${data.mesa}`
        ,5000);
        this.toastr.success(
          `El ticket N° ${data.id} está siendo \n atendido por la mesa ${data.mesa}`,
          'Nuevo ticket en atención',
          {
            tapToDismiss:true,
            positionClass:'toast-bottom-right',
            progressAnimation:'increasing',
            progressBar:true,
            timeOut:2700
          }
        );
      }
    )
  }

}
