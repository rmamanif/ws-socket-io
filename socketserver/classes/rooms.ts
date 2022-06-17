export class Room{
    id: string;
    nombre: string;
    fecha_creacion: Date;
    constructor( id:string){
        this.id = id;
        this.nombre = 'sin-nombre';
        this.fecha_creacion = new Date();
    }
}

