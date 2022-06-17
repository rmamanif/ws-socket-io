import { Lugar } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

interface RespMarcadores{
  [key:string]: Lugar
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  mapa: mapboxgl.Map;

  lugares: RespMarcadores = {};

  markersMapBox: {[id:string]:mapboxgl.Marker}  = {}

  constructor(
    private http: HttpClient,
    private wsService: WebsocketService
  ) { }

  ngOnInit(
  ) {
    this.http.get<RespMarcadores>('http://localhost:5000/mapa').
    subscribe( lugares =>{
      console.log(lugares);
      this.lugares = lugares;
      this.crearMapa();
    });
    this.listenSocket();
  }

  listenSocket(){

     this.wsService.listen('marcador-nuevo')
     .subscribe( (marcador: Lugar) =>
       this.agregarMarcador(marcador)
     );

     this.wsService.listen('marcador-borrar')
     .subscribe( (id: any) =>{
        this.markersMapBox[id].remove();
        delete this.markersMapBox[id];
     });

     this.wsService.listen('marcador-mover')
     .subscribe( (marcador: Lugar) =>
       this.markersMapBox[marcador.id].setLngLat([marcador.lng,marcador.lat])
     );

  }

  crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      accessToken: 'pk.eyJ1IjoicmRudG0iLCJhIjoiY2w0NGpxaDhnMDZmeTNpcDdlMmJnZnlnOSJ9.a0JM4zCTGRKZRib2b3tT7g',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 15.8
    });

    for(const [id,marcador] of Object.entries(this.lugares)){
      console.log(marcador);
      this.agregarMarcador(marcador);
    }
  }

  agregarMarcador(marcador: Lugar){

    /* const html = `<h2>${marcador.nombre}</h2>
                  <br>
                  <button>borrar</button>`; */

    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre

    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append(h2 ,btnBorrar);

    const customPopUp = new mapboxgl.Popup({
      offset:25,
      closeOnClick:false
    }).setDOMContent(div);
    const marker = new mapboxgl.Marker({
      draggable:true,
      color:marcador.color
    })
    .setLngLat([marcador.lng,marcador.lat])
    .setPopup(customPopUp)
    .addTo(this.mapa);

    marker.on('drag', ()=>{
      const lngLat = marker.getLngLat();
      console.log(lngLat);

      const nuevoMarcador ={
        id: marcador.id,
        ...lngLat
      }
      this.wsService.emit('marcador-mover', nuevoMarcador);
    });

    btnBorrar.addEventListener('click', () => {
      marker.remove();
      this.wsService.emit('marcador-borrar', marcador.id);
      }
    )
     this.markersMapBox[marcador.id] =  marker;
     console.log(this.markersMapBox);
  }


  crearMarcador(){
    const customMaker: Lugar = {
      id: new Date().toISOString(),
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      nombre: 'Sin Nombre',
      color: '#' +Math.floor(Math.random()*16777215).toString(16)
    }

    this.agregarMarcador(customMaker);

    this.wsService.emit('marcador-nuevo',  customMaker);
  }

}
