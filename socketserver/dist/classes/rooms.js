"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
class Room {
    constructor(id) {
        this.id = id;
        this.nombre = 'sin-nombre';
        this.fecha_creacion = new Date();
    }
}
exports.Room = Room;
