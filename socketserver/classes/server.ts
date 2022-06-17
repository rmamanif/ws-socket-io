import { SERVER_PORT } from './../global/environment';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {

    public static _instance: Server;

    public app!: express.Application;
    public port!: number;

    public io!: socketIO.Server;
    public httpServer!: http.Server;
    private constructor(){

        this.app = express(),
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app); 
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true }, allowEIO3:true } );

        this.escucharSockets();
    }


    public static get instance(){
        return this._instance ||  (this._instance = new this () );

    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');
        
        this.io.on('connection', cliente =>{
            console.log('Cliente conectado');
            //conectar cliente (al iniciar el app)
            socket.conectarCliente(cliente, this.io);
            //mapa socketio (mapbox)
            socket.MapBoxMarkers(cliente,  this.io);
            //config usuario (login)
            socket.configurarUsuario(cliente, this.io);
            //llamar usuarios
            socket.obtUsrs(cliente, this.io);
            //socket de mensajes
            socket.mensaje(cliente,this.io);
            //se desconecta el usuario
            socket.desconectar(cliente, this.io);
            //Google maps App Markers (Create, Move, Delete)
            socket.GoogleMarkers(cliente);
            //mesa
            socket.conectarMesa(cliente, this.io);
            //config mesa
            socket.configurarMesa(cliente, this.io);
            //tickets
            socket.TicketSockets(cliente, this.io);
        });
    };


    start(callback: VoidFunction) {

        this.httpServer.listen( this.port, callback );

    }
}