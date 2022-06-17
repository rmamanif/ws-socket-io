import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { local } from 'src/app/constants/values';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  current_dataset: number = 0;

  constructor(

    private http:HttpClient,
    public wsService:WebsocketService
  ) { }

  ngOnInit(): void {
    this.getBarChartData();
    this.listenSocket();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 1
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ 'opcion 1', 'opcion 2', 'opcion 3', 'opcion 4'],
    datasets: [
      { data: [ 0, 0, 0, 0], label: 'Encuesta 2022' }
    ]
  };

  getBarChartData(){
    this.http.get(`${environment.wsUrl}${local.encuesta}`)
    .subscribe((data:any) => {
      console.log('Inicializando', data[0]);
      console.log(this.barChartData.datasets[0]);
      this.barChartData.datasets[this.current_dataset] = data[0]
      this.chart?.update();
    });
  }

  listenSocket(){
    this.wsService.listen('cambio-encuesta').subscribe
    ((data:any) => {
      this.barChartData.datasets[this.current_dataset] = data[0];
      this.chart?.update();
    });
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100)];

    this.chart?.update();
  }

}
