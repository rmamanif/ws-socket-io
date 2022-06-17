import { rutas } from 'src/app/constantes/desk_routes';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-queue-initial',
  templateUrl: './queue-initial.component.html',
  styleUrls: ['./queue-initial.component.css']
})
export class QueueInitialComponent implements OnInit {

  nombre = '';
  mesastate = false;
  room_list = [];
  selected_room: string = 'sin-sala';

  constructor(
    public wsService: WebsocketService,
    private router:Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      this.mesastate =  localStorage.getItem('mesa') ? true : false
      this.http.get(`${environment.wsUrl}${rutas.rooms}`).subscribe((rooms:any)=>{
        this.room_list = rooms.salas;
      })
  }


  login(){
    if(this.nombre == '' || this.nombre =='sin-nombre'){
      this.toastr.warning(
        `Nombre en blanco`,
        'Error',
        {
          tapToDismiss:true,
          positionClass:'toast-bottom-right',
          progressAnimation:'increasing',
          progressBar:true,
          timeOut:2700
        }
      );

      return;
    }
    if(this.selected_room == '' || this.nombre == 'sin-sala'){
      this.toastr.success(
        `Sala no seleccionada`,
        'Error',
        {
          tapToDismiss:true,
          positionClass:'toast-bottom-right',
          progressAnimation:'increasing',
          progressBar:true,
          timeOut:2700
        }
      );
      return;
    }
    this.wsService.loginWS(this.nombre, this.selected_room).
    then(()=>{
      this.router.navigateByUrl('/atender-ticket')
    }
    )
  }

  newticket(){
    this.router.navigateByUrl('/nuevo-ticket/:id')
  }

  publiclist(){
    this.router.navigateByUrl('/publico')
  }

}
