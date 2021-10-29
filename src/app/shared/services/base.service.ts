import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected http: HttpClient) { }

  baseurl:string = 'baseurl';

  public GetIdToken(): Observable<any> {
   
      let token = 'token'
    return new Observable((subscriber) => {    
          subscriber.next(token);    
    });
  }

  private getAuthHeadder(): Observable<any> {
    
    let  contentType = 'application/json';
    return new Observable((subscribe) => {
      this.GetIdToken().subscribe((token:string) => {
        const JWT = `Bearer ${token}`;
        const authhttpOptions = {
          headers: new HttpHeaders({
            'Content-Type': contentType,
            Authorization: JWT
          }),
          params: new HttpParams()
        };
        subscribe.next(authhttpOptions);
      });
    });
  }

  GetItem<T>(actionName: string, id?: number): Observable<T> {
    let url = this.baseurl + '/api/' + actionName;
    if (id) {
      url = url + '/' + id;
    }
    return new Observable((subscriber) => {
      this.getAuthHeadder().subscribe((authhttpOptions) => {
        this.http
          .get(url, authhttpOptions)
          .pipe(
            catchError((err) => {
              subscriber.error(err);
              return EMPTY;
            }),
            first()
          )
          .subscribe(
            (responce: any) => {
              subscriber.next(responce as T);
            },
            () => {}
          );
      });
    });
 }
}