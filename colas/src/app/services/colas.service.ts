import { Injectable, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { rutas } from '../constantes/desk_routes';

@Injectable({
  providedIn: 'root'
})
export class ColasService implements OnInit {

  constructor(
    public wsService: WebsocketService
  ) { }
  ngOnInit(): void {
  }

  activeMesas(){
    return this.wsService.listen('mesas-activas');
  }

  getTickets(){
    return this.wsService.listen('tickets-activos');
  }

  getAtendidos(){
    return this.wsService.listen('tickets-atendidos');
  }

  getCurrentAttend(){
    return this.wsService.listen('cliente-actual');
  }

  getLastFive(){
    return this.wsService.listen('cola-publico');
  }

  grupalMessage(){
    return this.wsService.listen('grupal-msg');
  }

}
