import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authURL = environment.url_server;

  constructor(private http: HttpClient) { }

  public get(url: string){
    return this.http.get(this.authURL + url);
  }

  public getParam(url: string, params: string, datos: object) {
    const param = new HttpParams().set(params, JSON.stringify(datos));
    return this.http.get(this.authURL + url, {
      params: param
    });
  }

  post(objeto: any, url: string, options?: any) {
    return options ? this.http.post(this.authURL + url, objeto, options) : this.http.post(this.authURL + url, objeto);
  }

  put(objeto: object, url: string) {
    return this.http.put(this.authURL + url, objeto);
  }

  delete(url: string, body?: any) {
    return body ? this.http.delete(this.authURL + url, {body}) : this.http.delete(this.authURL + url);
  }

}
