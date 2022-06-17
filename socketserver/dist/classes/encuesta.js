"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncuestaData = void 0;
class EncuestaData {
    constructor() {
        this.año = ['opcion 1', 'opcion 2', 'opcion 3', 'opcion 4'];
        this.valores = [0, 0, 0, 0];
    }
    getDataGrafica() {
        return [
            { data: this.valores, label: 'Encuesta 2022' }
        ];
    }
    incrementarValor(opcion, valor) {
        this.valores[opcion] += valor;
        return this.getDataGrafica();
    }
}
exports.EncuestaData = EncuestaData;
