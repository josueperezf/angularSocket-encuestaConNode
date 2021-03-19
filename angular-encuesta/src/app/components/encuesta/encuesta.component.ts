import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

import { WebsocketService } from '../../servicios/websocket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// encuesta
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
    };
  public barChartLabels: string[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: any[] = [
    {data: [ 0, 0, 0, 0 ], label: 'Entrevistados'}
  ];
  constructor( private websocketService:WebsocketService, private httpClient:HttpClient  ) { }

  ngOnInit(): void {
    this.getDataInicial();
    this.esucharSocket();
  }
  getDataInicial() {
    this.httpClient.get(environment.socketUrl+'encuesta').subscribe((data:any)=>{
      console.log(data);
      this.barChartData = data;
    });
  }
  esucharSocket(){
    this.websocketService.escuchar('cambio-encuesta').subscribe((data:any)=>{
      console.log(data);
      this.barChartData = data;
    });
  }

}
