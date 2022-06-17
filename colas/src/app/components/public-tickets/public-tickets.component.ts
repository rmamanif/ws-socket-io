import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColasService } from '../../services/colas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-public-tickets',
  templateUrl: './public-tickets.component.html',
  styleUrls: ['./public-tickets.component.css']
})
export class PublicTicketsComponent implements OnInit {

  latestAttended: any = {
    id:'--',
    mesa:'cargando...',
    user:'pendiente...'
  };
  latestFour: Array<any> = [
    {
      id:'--',
      mesa:'cargando...',
      user:'pendiente...'
    },
    {
      id:'--',
      mesa:'cargando...',
      user:'pendiente...'
    }
  ];
  constructor(
    public http: HttpClient,
    public csService: ColasService
  ) { }

  ngOnInit(): void {
    this.getlastFive();
  }

  getlastFive(){
    this.csService.getLastFive()
      .subscribe((data:any) =>{
        this.latestAttended = data.pop();
        this.latestFour = data;
    })
  }

}
