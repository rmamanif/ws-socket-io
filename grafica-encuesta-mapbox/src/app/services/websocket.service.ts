import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario = null;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
  }


    checkStatus() {

      this.socket.on('connect', () => {
        this.socketStatus = true;
      });

      this.socket.on('disconnect', () => {
        this.socketStatus = false;
      });
    }


    emit( evento: string, payload?: any, callback?: Function ) {
      // emit('EVENTO', payload, callback?)
      this.socket.emit( evento, payload, callback );

    }

    listen( evento: string ) {
      return this.socket.fromEvent( evento );
    }


}
