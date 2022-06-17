import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  msgSubscription!: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(
    public chatService: ChatService
  ) {
   }
  ngOnDestroy(): void {
    this.msgSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes')!;

    this.msgSubscription =  this.chatService.getMessages().subscribe( msg =>{
      console.log(msg);
      this.mensajes.push(msg);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight
      },50);
    });
  }


  enviar(){
    if ( this.texto.trim().length === 0 ) {
      return;
    }

    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }
}
