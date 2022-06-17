import { environment } from 'src/environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { google } from '@google/maps';
import { Lugar, values } from 'src/app/interface/interface';
import { WebsocketService } from 'src/app/services/websocket.service';
declare var google:any;
@Component({
  selector: 'app-google-mapa',
  templateUrl: './google-mapa.component.html',
  styleUrls: ['./google-mapa.component.css']
})

export class GoogleMapaComponent implements OnInit {

  @ViewChild('map') mapaElement: ElementRef;
  map: google.maps.Map;


  marcadores: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];

  lugares: Lugar[] = [  ];

  constructor(
    private http:HttpClient,
    public wsService: WebsocketService
    ) { }

  ngOnInit(): void {

    this.http.get(`${environment.wsUrl}${values.gglmapa}`)
    .subscribe((lugares:any )=>{
      this.lugares = lugares;
      this.cargarMapa();
    })
    this.listenSockets();
  }

  cargarMapa() {
    const latlng = new google.maps.LatLng(37.784679, -122.395936)

    const mapaopt: google.maps.MapOptions = {
      center: latlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapaElement.nativeElement, mapaopt);

    for (const lugar of this.lugares){
      this.agregarMarcador(lugar)
    }


  }

  agregarMarcador(marcador: Lugar){
    const latLng = new google.maps.LatLng(marcador.lat,marcador.lng);

    const marker = new google.maps.Marker({
      map:this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true,
      title: marcador.id
    })

    this.marcadores.push(marker);

    const contenido = `<b>${marcador.nombre}</b>`;

    const infoWindow = new google.maps.InfoWindow({
      content:contenido
    });

    this.infoWindows.push(infoWindow);

    //Metodo comentado, se crea un marcador a través de click
    /*  google.maps.event.addDomListener(marker, 'click', (coors)=>{
      this.infoWindows.forEach(infow =>infow.close())
      const nuevoMarcador: Lugar = {
        nombre: 'Nuevo Lugar',
        lat:coors.lat(),
        lng:coors.lng(),
        id: new Date().toISOString()
      };
      this.agregarMarcador(nuevoMarcador);

      this.wsService.emit('ggl-marcador-nuevo', nuevoMarcador);
      infoWindow.open(this.map, marker);

    }); */
    google.maps.event.addDomListener(marker, 'dblclick', (coors)=>{
      marker.setMap( null );
      this.wsService.emit('ggl-marcador-borrar', marcador.id);
    });

    google.maps.event.addDomListener(marker, 'drag', (coors)=>{
      const nuevoMarcador = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        nombre: marcador.nombre,
        id:marcador.id
        };

        this.wsService.emit('ggl-marcador-mover', nuevoMarcador);

    });
  }

  getMapCenter(){
    const ctrLatLng = this.map.getCenter();

    const nuevoMarcador: Lugar = {
      nombre: 'Nuevo Lugar',
      lat:ctrLatLng.lat(),
      lng:ctrLatLng.lng(),
      id: new Date().toISOString()
    };
    this.agregarMarcador(nuevoMarcador);

    this.wsService.emit('ggl-marcador-nuevo', nuevoMarcador);
  }

  listenSockets(){
    this.wsService.listen('ggl-marcador-nuevo').subscribe(
      (marcador:any) =>{
        this.agregarMarcador(marcador);
      }
    )
    this.wsService.listen('ggl-marcador-mover').subscribe(
      (marcador:any) =>{
        for ( const i in this.marcadores ) {

          if ( this.marcadores[i].getTitle() === marcador.id ) {

            const latLng = new google.maps.LatLng( marcador.lat, marcador.lng );
            this.marcadores[i].setPosition( latLng );
            break;
          }}
      });


    this.wsService.listen('ggl-marcador-borrar').subscribe(
      (id:any) =>{
        for(const i in this.marcadores){
          if(this.marcadores[i].getTitle() === id){
            this.marcadores[i].setMap( null );
            break;
          }
        }

        });

  }
}
