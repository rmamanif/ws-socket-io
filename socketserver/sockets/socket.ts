import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Usuario } from '../classes/usuario';
import { Marcador } from '../classes/marcador';
import { TkUsr } from '../classes/ticketusuario';
import { gglmapa, mapa, usuariosConectados, usuariosTicket } from '../classes/initializing';


export const conectarCliente = (cliente:Socket, io:socketIO.Server) =>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket, io:socketIO.Server) => {

    cliente.on('disconnect', ( ) =>{
        console.log('Cliente Desconectado');
        var delMesaSala = usuariosTicket.getMesa(cliente.id);
        if(delMesaSala != undefined){
            cliente.leave(delMesaSala.sala);
        }
        usuariosConectados.borrarUsuario(cliente.id);
        usuariosTicket.limpiarMesa(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}


export const mensaje = (cliente: Socket, io:socketIO.Server ) => {

    cliente.on('mensaje', (payload:{de:string, cuerpo:string} ) =>{
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });

    cliente.on('msg-grupal', () =>{
        io.in('sin-sala').emit('usuarios-activos', usuariosConectados.getLista());
    })
}


export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', (  payload: { nombre: string }, callback: Function  ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        io.emit('usuarios-activos', usuariosConectados.getLista()  );
        
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });
}


export const obtUsrs = (cliente: Socket, io:socketIO.Server) =>{
    cliente.on('obtener-usuarios', () =>{
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    })
}



export const MapBoxMarkers = (cliente:Socket, io:socketIO.Server) =>{
    cliente.on('marcador-nuevo', (marcador:Marcador)=>{
        mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador, ()=>{

        });
    })

    cliente.on('marcador-borrar', (id:string)=>{
        mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id, ()=>{

        });
    })

    cliente.on('marcador-mover', (marcador: Marcador)=>{
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador, ()=>{
        });
    })
}



export const GoogleMarkers = (cliente:Socket) =>{
    cliente.on('ggl-marcador-nuevo', (marcador)=>{
        gglmapa.agregarMarcador(marcador);
        cliente.broadcast.emit('ggl-marcador-nuevo',marcador);
    });
    cliente.on('ggl-marcador-borrar', (id: string)=>{
        gglmapa.borrarMarcador(id);
        cliente.broadcast.emit('ggl-marcador-borrar',id);
    });
    cliente.on('ggl-marcador-mover', (marcador) =>{
        gglmapa.moverMarcador(marcador);
        cliente.broadcast.emit('ggl-marcador-mover', marcador);
    });
}

export const TicketSockets =(cliente:Socket, io:socketIO.Server) =>{

    cliente.on('generar-ticket', (payload: {id:string, user:string, mesa:string}, callback: Function) =>{
        usuariosTicket.nuevoTicket(payload);
        callback({
            ok: true,
            mensaje: `Ticket ${payload.id} generado`
        });
        io.emit('tickets-activos', usuariosTicket.getTickets());
    });

    cliente.on('atender-ticket', (payload: {mesa:string}, callback: Function) =>{
        var current_attend = usuariosTicket.assignTable(payload.mesa);
        callback({
            ok: true,
            mensaje: `Ticket atendido`,
        });

        const deskRoom = usuariosTicket.getMesa(cliente.id);
        cliente.emit('cliente-actual', current_attend);
        io.emit('tickets-activos', usuariosTicket.getTickets());
        io.emit('tickets-atendidos', usuariosTicket.getAttended());
        io.emit('cola-publico', usuariosTicket.getLastFive());
        console.log(deskRoom)
        cliente.broadcast.in(deskRoom.sala).emit('grupal-msg', current_attend);
    });
}

export const conectarMesa = (cliente:Socket, io:socketIO.Server) =>{
    const usuario = new TkUsr(cliente.id);
    console.log(usuario);
    usuariosTicket.agregar(usuario);
}


export const configurarMesa = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-mesa', (  payload: { nombre: string, room:string }, callback: Function  ) => {
        usuariosTicket.actualizarNombre( cliente.id, payload.nombre, payload.room );
        cliente.join(payload.room);
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre } | Mesa ${payload.room}, configurado`
        });
        io.emit('mesas-activas', usuariosTicket.getMesas() )
    });
}


