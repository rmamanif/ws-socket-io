"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salas = exports.encuesta = exports.grafica = exports.usuariosTicket = exports.mapa = exports.usuariosConectados = exports.gglmapa = void 0;
const encuesta_1 = require("./encuesta");
const gglmapa_1 = require("./gglmapa");
const grafica_1 = require("./grafica");
const mapa_1 = require("./mapa");
const ticket_lista_1 = require("./ticket-lista");
const usuarios_lista_1 = require("./usuarios-lista");
const roomsList_1 = require("./roomsList");
exports.gglmapa = new gglmapa_1.gglMapa();
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
exports.mapa = new mapa_1.Mapa();
exports.usuariosTicket = new ticket_lista_1.TicketLista();
exports.grafica = new grafica_1.GraficaData();
exports.encuesta = new encuesta_1.EncuestaData();
exports.salas = new roomsList_1.RoomList();
const lugares = [
    {
        id: '1',
        nombre: 'Udemy',
        lat: 37.784679,
        lng: -122.395936
    },
    {
        id: '2',
        nombre: 'Bahía de San Francisco',
        lat: 37.798933,
        lng: -122.377732
    },
    {
        id: '3',
        nombre: 'The Palace Hotel',
        lat: 37.788578,
        lng: -122.401745
    }
];
exports.gglmapa.marcadores.push(...lugares);
const initial_rooms = [
    {
        id: '1',
        nombre: 'Cuzco',
        fecha_creacion: new Date()
    },
    {
        id: '2',
        nombre: 'Tumbes',
        fecha_creacion: new Date()
    },
    {
        id: '3',
        nombre: 'Cajamarca',
        fecha_creacion: new Date()
    }
];
exports.salas.lista.push(...initial_rooms);
