import { Room } from "./rooms";

export class RoomList {
    public lista: Room[] = [];
    room_id: number;

    constructor(
    ) {
        this.room_id = 0;
    }


    public agregar (sala: Room){
        this.room_id += 1;
        for (let usr of this.lista){
            if(usr.nombre == sala.nombre){
                console.log('Nombre de sala ya existe')
                return sala;
            }
        }
        sala.id = this.room_id.toString();
        this.lista.push(sala);
        console.log('Añadiendo mesa');
        return sala;
    }

    public all_rooms(){
        return this.lista;
    }

    public get_Room(id:string){
        return this.lista.find(sala => sala.id === id );
    }

}