"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketLista = void 0;
class TicketLista {
    constructor() {
        this.lista = [];
        this.ticket_lista = [];
        this.tickets_atendidos = [];
        this.atendido = 0;
    }
    agregar(usuario) {
        for (let usr of this.lista) {
            if (usr.nombre == usuario.nombre) {
                console.log('La mesa ya está activa!');
                return usuario;
            }
        }
        this.lista.push(usuario);
        console.log('Agregando Mesa');
        console.log(usuario);
        return usuario;
    }
    actualizarNombre(id, nombre, sala) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                usuario.sala = sala;
                break;
            }
        }
        console.log('============================');
        console.log('=== Actualizando Mesas ===');
        console.log(this.lista);
        console.log('============================');
    }
    getMesa(id) {
        let mesa_sel = this.lista.find(usuario => usuario.id === id);
        return mesa_sel;
    }
    assignTable(mesa) {
        if (this.ticket_lista.length > 0) {
            const toAttend = this.ticket_lista.shift();
            toAttend.mesa = mesa;
            this.atendido += 1;
            toAttend.id = this.atendido.toString();
            this.tickets_atendidos.push(toAttend);
            return toAttend;
        }
        else {
            console.log('No hay tickets pendientes');
            return;
        }
    }
    nuevoTicket(tk) {
        return this.ticket_lista.push(tk);
    }
    getLastFive() {
        return this.tickets_atendidos.slice(-5);
    }
    getMesas() {
        return this.lista;
    }
    getTickets() {
        return this.ticket_lista;
    }
    getAttended() {
        return this.tickets_atendidos;
    }
    limpiarMesa(id) {
        const tempUsuario = this.getMesa(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }
}
exports.TicketLista = TicketLista;
