"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./../global/environment");
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/socket"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(),
            this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = new socket_io_1.default.Server(this.httpServer, { cors: { origin: true, credentials: true }, allowEIO3: true });
        this.escucharSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            console.log('Cliente conectado');
            //conectar cliente (al iniciar el app)
            socket.conectarCliente(cliente, this.io);
            //mapa socketio (mapbox)
            socket.MapBoxMarkers(cliente, this.io);
            //config usuario (login)
            socket.configurarUsuario(cliente, this.io);
            //llamar usuarios
            socket.obtUsrs(cliente, this.io);
            //socket de mensajes
            socket.mensaje(cliente, this.io);
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
    }
    ;
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
