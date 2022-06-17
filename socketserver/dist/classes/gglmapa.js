"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gglMapa = void 0;
class gglMapa {
    constructor() {
        this.marcadores = [];
    }
    getMarcadores() {
        return this.marcadores;
    }
    agregarMarcador(marcador) {
        this.marcadores.push(marcador);
    }
    borrarMarcador(id) {
        this.marcadores = this.marcadores.filter(item => item.id !== id);
        return this.marcadores;
    }
    moverMarcador(marcador) {
        for (const i in this.marcadores) {
            if (this.marcadores[i].id === marcador.id) {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }
    }
}
exports.gglMapa = gglMapa;
