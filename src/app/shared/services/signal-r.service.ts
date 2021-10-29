import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr"; 
import { Stock } from '../models/stock-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;
  public data: Stock[]=[];
  public bradcastedData: Stock[]=[];


  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:5001/stocks/getStockData')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err: string) => console.log('Error while starting connection: ' + err))
  }

  public addTransferStockDataListener = () => {
    this.hubConnection.on('transferchartdata', (data: any) => {
      this.data = data;
      console.log(data);
    });
  }

  public broadcastStockData = () => {
    this.hubConnection.invoke('broadcastStockdata', this.data)
    .catch(err => console.error(err));
  }
  
  public addStockDataListener = () => {
    this.hubConnection.on('broadcastStockdata', (data) => {
      this.bradcastedData = data;
    })
  }
}
