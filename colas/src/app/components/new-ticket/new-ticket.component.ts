import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { rutas } from 'src/app/constantes/desk_routes';
import { environment } from 'src/environments/environment';
import { ColasService } from '../../services/colas.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  gen_ticket: boolean = true;
  ticket_list: [] = [];
  constructor(
    public wsService: WebsocketService,
    public csService: ColasService,
    public http: HttpClient
    ) { }

  ngOnInit(

  ): void {
    this.http.get<any>(`${environment.wsUrl}${rutas.mesas_activas}`).subscribe(data => {
      if (data.mesas.length >0){
        this.gen_ticket = false;
      }
    });

    this.http.get<any>(`${environment.wsUrl}${rutas.tickets_activos}`).subscribe(data => {
      this.ticket_list = data.tickets;
    });


    this.checkActiveDesks();
    this.getTicket();
  }

  checkActiveDesks(){
    this.csService.activeMesas().subscribe(
      (data:any) => {
        if (data.length >0){
          this.gen_ticket = false;
        }
      }
    )

  }


  getTicket(){
      this.csService.getTickets().subscribe(
        (data:any) =>{
          this.ticket_list = data;
        }
      )
  }

  genTicket(){
    const usr = JSON.parse(localStorage.getItem('mesa')).nombre;
    const ticket = {
      id: (this.ticket_list.length+1).toString(),
      user: usr,
      mesa:'sin-mesa'
    }
    this.wsService.emit('generar-ticket', ticket, resp =>{
      console.log(resp);
      this.getTicket();
    });
  }

}
