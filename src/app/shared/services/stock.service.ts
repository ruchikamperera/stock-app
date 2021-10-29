import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Stock } from '../models/stock-model';


@Injectable({
  providedIn: 'root'
})
export class StockService extends BaseService {

  constructor(protected http: HttpClient) { 
    super(http);
  }

  public getStockDetails(): Observable<Stock[]> {
    return this.GetItem<Stock[]>('stocks/getStockDetails');
  }
}
