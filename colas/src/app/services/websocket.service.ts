import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario, Sala } from '../classes/usuario';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = new Usuario('test');
  public sala: Sala = new Sala('test');
  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.cargarStorage();
    this.checkStatus();
  }


    checkStatus() {

      this.socket.on('connect', () => {
        console.log('Conectado al servidor');
        this.socketStatus = true;
        this.cargarStorage();
      });

      this.socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
        this.socketStatus = false;
      });
    }


    emit( evento: string, payload?: any, callback?: Function ) {

      console.log('Emitiendo', evento);
      // emit('EVENTO', payload, callback?)
      this.socket.emit( evento, payload, callback );

    }

    listen( evento: string ) {
      return this.socket.fromEvent( evento );
    }

    loginWS( nombre: string, room: string ) {
      return new Promise<void>(  (resolve, reject) => {
        this.emit( 'configurar-mesa', { nombre, room }, resp => {
          this.usuario = new Usuario( nombre );
          this.sala = new Sala (room);
          this.guardarStorage();
          resolve();
          console.log(resp);
        });

      });

    }

    logoutWS() {
      this.usuario = null;
      localStorage.removeItem('mesa');
      localStorage.removeItem('sala');

      const payload = {
        nombre: 'sin-nombre',
        sala: 'sin-sala'
      };

      this.emit('configurar-mesa', payload, () => {} );

    }


    getUsuario() {
      return this.usuario;
    }

    guardarStorage() {
      localStorage.setItem( 'mesa', JSON.stringify( this.usuario ) );
      localStorage.setItem( 'sala', JSON.stringify(this.sala))
    }

    cargarStorage() {

      if ( localStorage.getItem('mesa') ) {
        this.usuario = JSON.parse( localStorage.getItem('mesa') );
        this.sala = JSON.parse( localStorage.getItem('sala') );
        if (this.usuario == undefined){
          this.usuario = new Usuario('band-aid');
        }
        if (this.sala == undefined ){
          this.sala = new Sala('band-aid');
        }

        this.loginWS( this.usuario.nombre, this.sala.nombre );
      }

    }

}
