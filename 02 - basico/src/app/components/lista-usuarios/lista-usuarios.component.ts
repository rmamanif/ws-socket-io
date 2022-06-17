import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {


  usuariosactivosObs: Observable<any>;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {

    this.usuariosactivosObs = this.chatService.getUsuariosActivos();
    this.chatService.emitirUsuarios();
  }

}
