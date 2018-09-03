import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  facURL='https://comprasapp-8a05e.firebaseio.com/facturas';
  constructor(private http: Http) { }

  postFactura(factura: any){
    const newfact = JSON.stringify(factura);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.facURL.concat('.json'),newfact,{headers})
    .map(res => {
      return res.json();
    })
  }

  getFacturas(){
    return this.http.get(this.facURL.concat('.json')).map(res => res.json());
  }

  getFactura(id$: string){
    const url = `${this.facURL}/${id$}.json`;
    return this.http.get(url).map(res => res.json());
  }

  putFactura(factura: any, id$: string){
    const newfact = JSON.stringify(factura);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.facURL}/${id$}.json`;
    return this.http.put(url, newfact, {headers}).map(res => {
      return res.json();
    })
  }

  deleteFactura(id$: string){
    const url = `${this.facURL}/${id$}.json`;
    return this.http.delete(url).map(res => res.json());
  }
}
