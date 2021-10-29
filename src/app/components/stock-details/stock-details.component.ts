import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/shared/services/signal-r.service';
import {Stock} from 'src/app/shared/models/stock-model'
import { StockService } from 'src/app/shared/services/stock.service';
import { environment } from 'src/environments/environment';  
import * as signalR from '@aspnet/signalr';


@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})

export class StockDetailsComponent implements OnInit {

  stocks : Stock[]= [];
  constructor(public signalRService: SignalRService
   , private stockServiceService: StockService
    ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addStockDataListener();   
    this.getStockDetails();
  }
  private getStockDetailsRealTime = () => {
  
  const connection = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl(environment.baseUrl + 'notify')  
      .build();  
  
    connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
  
    connection.on("broadcastStockdata", () => {  
      this.getStockDetails();  
    });  
  }  

  private onToggleChange = (id:number) => {
   // action here
  }
  private getStockDetails = () => {
    this.stockServiceService.getStockDetails()
      .subscribe(data => {
        if(data)
        {
          this.stocks = data;
        }
      })
  }
}
