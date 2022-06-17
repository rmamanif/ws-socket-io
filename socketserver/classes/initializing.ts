import { EncuestaData } from './encuesta';
import { gglMapa } from './gglmapa';
import { GraficaData } from './grafica';
import { Mapa } from './mapa';
import { Room } from './rooms';
import { TicketLista } from './ticket-lista';
import { UsuariosLista } from './usuarios-lista';
import { RoomList } from './roomsList';

export const gglmapa = new gglMapa();

export const usuariosConectados = new UsuariosLista();

export const mapa = new  Mapa();

export const usuariosTicket = new TicketLista();

export const grafica = new GraficaData();

export const encuesta = new EncuestaData();

export const salas = new RoomList();


const lugares = [
    {
        id:'1',
      nombre: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
        id:'2',
      nombre: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
        id:'3',
      nombre: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
];

gglmapa.marcadores.push(...lugares);

const initial_rooms: Room [] = [
  {
    id:'1',
    nombre: 'Cuzco',
    fecha_creacion: new Date()
  },
  {
    id:'2',
    nombre: 'Tumbes',
    fecha_creacion: new Date()
  },
  {
    id:'3',
    nombre: 'Cajamarca',
    fecha_creacion: new Date()
  }
]

salas.lista.push(...initial_rooms);