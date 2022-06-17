"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurarMesa = exports.conectarMesa = exports.TicketSockets = exports.GoogleMarkers = exports.MapBoxMarkers = exports.obtUsrs = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = void 0;
const usuario_1 = require("../classes/usuario");
const ticketusuario_1 = require("../classes/ticketusuario");
const initializing_1 = require("../classes/initializing");
const conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    initializing_1.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        var delMesaSala = initializing_1.usuariosTicket.getMesa(cliente.id);
        if (delMesaSala != undefined) {
            cliente.leave(delMesaSala.sala);
        }
        initializing_1.usuariosConectados.borrarUsuario(cliente.id);
        initializing_1.usuariosTicket.limpiarMesa(cliente.id);
        io.emit('usuarios-activos', initializing_1.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
    cliente.on('msg-grupal', () => {
        io.in('sin-sala').emit('usuarios-activos', initializing_1.usuariosConectados.getLista());
    });
};
exports.mensaje = mensaje;
const configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        initializing_1.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', initializing_1.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
exports.configurarUsuario = configurarUsuario;
const obtUsrs = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', initializing_1.usuariosConectados.getLista());
    });
};
exports.obtUsrs = obtUsrs;
const MapBoxMarkers = (cliente, io) => {
    cliente.on('marcador-nuevo', (marcador) => {
        initializing_1.mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador, () => {
        });
    });
    cliente.on('marcador-borrar', (id) => {
        initializing_1.mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id, () => {
        });
    });
    cliente.on('marcador-mover', (marcador) => {
        initializing_1.mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador, () => {
        });
    });
};
exports.MapBoxMarkers = MapBoxMarkers;
const GoogleMarkers = (cliente) => {
    cliente.on('ggl-marcador-nuevo', (marcador) => {
        initializing_1.gglmapa.agregarMarcador(marcador);
        cliente.broadcast.emit('ggl-marcador-nuevo', marcador);
    });
    cliente.on('ggl-marcador-borrar', (id) => {
        initializing_1.gglmapa.borrarMarcador(id);
        cliente.broadcast.emit('ggl-marcador-borrar', id);
    });
    cliente.on('ggl-marcador-mover', (marcador) => {
        initializing_1.gglmapa.moverMarcador(marcador);
        cliente.broadcast.emit('ggl-marcador-mover', marcador);
    });
};
exports.GoogleMarkers = GoogleMarkers;
const TicketSockets = (cliente, io) => {
    cliente.on('generar-ticket', (payload, callback) => {
        initializing_1.usuariosTicket.nuevoTicket(payload);
        callback({
            ok: true,
            mensaje: `Ticket ${payload.id} generado`
        });
        io.emit('tickets-activos', initializing_1.usuariosTicket.getTickets());
    });
    cliente.on('atender-ticket', (payload, callback) => {
        var current_attend = initializing_1.usuariosTicket.assignTable(payload.mesa);
        callback({
            ok: true,
            mensaje: `Ticket atendido`,
        });
        const deskRoom = initializing_1.usuariosTicket.getMesa(cliente.id);
        cliente.emit('cliente-actual', current_attend);
        io.emit('tickets-activos', initializing_1.usuariosTicket.getTickets());
        io.emit('tickets-atendidos', initializing_1.usuariosTicket.getAttended());
        io.emit('cola-publico', initializing_1.usuariosTicket.getLastFive());
        console.log(deskRoom);
        cliente.broadcast.in(deskRoom.sala).emit('grupal-msg', current_attend);
    });
};
exports.TicketSockets = TicketSockets;
const conectarMesa = (cliente, io) => {
    const usuario = new ticketusuario_1.TkUsr(cliente.id);
    console.log(usuario);
    initializing_1.usuariosTicket.agregar(usuario);
};
exports.conectarMesa = conectarMesa;
const configurarMesa = (cliente, io) => {
    cliente.on('configurar-mesa', (payload, callback) => {
        initializing_1.usuariosTicket.actualizarNombre(cliente.id, payload.nombre, payload.room);
        cliente.join(payload.room);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} | Mesa ${payload.room}, configurado`
        });
        io.emit('mesas-activas', initializing_1.usuariosTicket.getMesas());
    });
};
exports.configurarMesa = configurarMesa;
