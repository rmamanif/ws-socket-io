import { Component, OnInit } from '@angular/core';
import { ColasService } from '../../services/colas.service';
import { HttpClient } from '@angular/common/http';
import { rutas } from 'src/app/constantes/desk_routes';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../../services/websocket.service';
import { PushNotificationService } from 'ng-push-notification';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attend-ticket',
  templateUrl: './attend-ticket.component.html',
  styleUrls: ['./attend-ticket.component.css']
})
export class AttendTicketComponent implements OnInit {

  mesa: string;
  cur_ticket: string = '-';
  ticket_list: [] = [];
  constructor(
    public csService: ColasService,
    public http:HttpClient,
    public wsService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.mesa = JSON.parse(localStorage.getItem('mesa')).nombre;
    this.http.get<any>(`${environment.wsUrl}${rutas.tickets_activos}`).subscribe(data => {
      this.ticket_list = data.tickets;
    });

    this.pendingTickets();
    this.currentAttending();
  }

  pendingTickets(){
    this.csService.getTickets().subscribe(
      (data:any) =>{
        this.ticket_list = data;
      }
    )
  };



  atenderTicket(){
    const mesa = JSON.parse(localStorage.getItem('mesa')).nombre;
    this.wsService.emit('atender-ticket',{mesa}, ((resp:any)=>{
      console.log(resp);
    }));
  };
  currentAttending(){
    this.csService.getCurrentAttend().subscribe(
      (data: any) =>{
        this.cur_ticket = data.id;
      }
    )
  }

}
