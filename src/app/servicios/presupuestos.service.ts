import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  preURL='https://comprasapp-8a05e.firebaseio.com/presupuestos';
  constructor(private http:Http) { }

  postPresupuesto(presupuesto: any){
    const newpres=JSON.stringify(presupuesto);
    const headers = new Headers({'Content-Type': 'application/json'});    
    return this.http.post(this.preURL.concat('.json'),newpres,{headers})
      .map(res => {
        console.log(res.json());
        return res.json();
      })
  }

  getPresupuestos(){
    return this.http.get(this.preURL.concat('.json'))
    .map(res => res.json());
  }

  getPresupuesto(id$: string){
    const url = `${this.preURL}/${id$}.json`;
    return this.http.get(url).map( res => res.json());
  }

  putPresupuesto(presupuesto:any, id$: string){
    const newpre = JSON.stringify(presupuesto);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.preURL}/${id$}.json`;
    return this.http.put(url, newpre, {headers}).map(res => {
      console.log(res.json());
      return res.json();
    })
  }

  delPresupuesto(id$: string){
    const url = `${this.preURL}/${id$}.json`;
    return this.http.delete(url).map(res => res.json());
  }

  getProveedoresSearch(busqueda: string) {
    const url = `${ this.preURL.concat('.json') }?orderBy="proveedor"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url).map(res => res.json());
  }
}
