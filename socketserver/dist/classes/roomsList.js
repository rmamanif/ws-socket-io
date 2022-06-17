"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomList = void 0;
class RoomList {
    constructor() {
        this.lista = [];
        this.room_id = 0;
    }
    agregar(sala) {
        this.room_id += 1;
        for (let usr of this.lista) {
            if (usr.nombre == sala.nombre) {
                console.log('Nombre de sala ya existe');
                return sala;
            }
        }
        sala.id = this.room_id.toString();
        this.lista.push(sala);
        console.log('Añadiendo mesa');
        return sala;
    }
    all_rooms() {
        return this.lista;
    }
    get_Room(id) {
        return this.lista.find(sala => sala.id === id);
    }
}
exports.RoomList = RoomList;
