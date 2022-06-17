
export class TicketModel {
    public id: string;
    public user: string;
    public mesa: string;
    
    constructor( id:string){
        this.id = id;
        this.user = 'usuario-1';
        this.mesa = 'sin-mesa';
    }

}