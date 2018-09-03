import { Component, OnInit } from '@angular/core';

import {PresupuestosService} from '../../servicios/presupuestos.service'

@Component({
  selector: 'app-listpres',
  templateUrl: './listpres.component.html',
  styleUrls: ['./listpres.component.css']
})
export class ListpresComponent implements OnInit {
  cargando = true;
  presupuestos:any[]=[];
  constructor(private presupuestoService: PresupuestosService) {
    presupuestoService.getPresupuestos()
    .subscribe(presupuestos => {
      for(const id$ in presupuestos){
        const p = presupuestos[id$];
        p.id$ = id$;
        this.presupuestos.push(presupuestos[id$]);
      }
      this.cargando = false;
    })
  }

  ngOnInit() {
  }

  eliminarPresupuesto(id$){
    this.presupuestoService.delPresupuesto(id$).subscribe(res => {
      this.presupuestos = [];
      this.presupuestoService.getPresupuestos().subscribe(presupuestos => {
        for(const id$ in presupuestos){
          const p = presupuestos[id$];
          p.id$ = id$;
          this.presupuestos.push(presupuestos[id$]);
        }
      })
    });    
  }

}
