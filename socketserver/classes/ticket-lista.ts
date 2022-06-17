import { TkUsr } from './ticketusuario';
import { TicketModel } from './ticket';
export class TicketLista{

    private lista: TkUsr[] = [];
    private ticket_lista: TicketModel[] = [];
    private tickets_atendidos: TicketModel[] = [];
    atendido: number;

    constructor(
    ){
        this.atendido = 0;
    }

    public agregar (usuario: TkUsr){
        for (let usr of this.lista){
            if(usr.nombre == usuario.nombre){
                console.log('La mesa ya está activa!')
                return usuario;
            }
        }
        this.lista.push(usuario);
        console.log('Agregando Mesa');
        console.log(usuario);
        return usuario;
    }

    public actualizarNombre(id:string, nombre:string, sala: string){
        for ( let usuario of this.lista ){
            if(usuario.id === id){
                usuario.nombre = nombre;
                usuario.sala = sala;
                break;
            }
        }
        console.log('============================')
        console.log('=== Actualizando Mesas ===');
        console.log(this.lista);
        console.log('============================')
    }


    public getMesa(id: string){
        let mesa_sel= this.lista.find(usuario => usuario.id === id );
        return mesa_sel;
    }

    public assignTable(mesa:string){
        if(this.ticket_lista.length >0){
            const toAttend = this.ticket_lista.shift();
            toAttend.mesa = mesa ;
            this.atendido += 1;
            toAttend.id = this.atendido.toString();
            this.tickets_atendidos.push(toAttend);
            return toAttend;
        }else{
            console.log('No hay tickets pendientes');
            return;
        }
    }

    public nuevoTicket(tk:TicketModel){
        return this.ticket_lista.push(tk);
    }

    public getLastFive(){
        return this.tickets_atendidos.slice(-5);
    }

    public getMesas(){
        return this.lista;
    }

    public getTickets(){
        return this.ticket_lista;
    }
    
    public getAttended(){
        return this.tickets_atendidos;
    }


    public limpiarMesa(id: string){
        const tempUsuario = this.getMesa(id);
        this.lista = this.lista.filter( usuario => usuario.id !== id );
        return tempUsuario;     
    }

    

}