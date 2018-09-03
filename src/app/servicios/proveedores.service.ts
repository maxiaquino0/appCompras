import { Injectable } from '@angular/core';
import { Http, Headers } from '../../../node_modules/@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  proURL='https://comprasapp-8a05e.firebaseio.com/proveedores';
  constructor(private http:Http) { }

  postProveedor(proveedor: any){
    const newprov=JSON.stringify(proveedor);
    const headers = new Headers({'Content-Type': 'application/json'});    
    return this.http.post(this.proURL.concat('.json'),newprov,{headers})
      .map(res => {
        console.log(res.json());
        return res.json();
      })
  }

  getProveedores(){
    return this.http.get(this.proURL.concat('.json'))
    .map(res => res.json());
  }

  getProveedor(id$: string){
    const url = `${this.proURL}/${id$}.json`;
    return this.http.get(url).map( res => res.json());
  }

  putProveedor(proveedor:any, id$: string){
    const newprov = JSON.stringify(proveedor);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.proURL}/${id$}.json`;
    return this.http.put(url, newprov, {headers}).map(res => {
      console.log(res.json());
      return res.json();
    })
  }

  delProveedor(id$: string){
    const url = `${this.proURL}/${id$}.json`;
    return this.http.delete(url).map(res => res.json());
  }

  getProveedoresSearch(busqueda: string) {
    const url = `${ this.proURL.concat('.json') }?orderBy="nombre"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url).map(res => res.json());
  }
}
