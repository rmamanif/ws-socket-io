import { Marcador } from "./marcador";
import { gglMarcador } from './gglmarcador';

export class gglMapa{
    
    public marcadores: gglMarcador[] = [];
    
    constructor(){
    }

    getMarcadores(){
        return this.marcadores;
    }

    agregarMarcador(marcador: gglMarcador){
        this.marcadores.push(marcador);
  
    }
      
    borrarMarcador(id: string){
        this.marcadores = this.marcadores.filter( item => item.id !== id)
        return this.marcadores;
    }

    moverMarcador(marcador: gglMarcador){
        for (const i in this.marcadores){
            if(this.marcadores[i].id === marcador.id){
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }        
    }

}