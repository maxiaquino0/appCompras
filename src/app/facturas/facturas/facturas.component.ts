import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../servicio/facturas.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  cargando = true;
  facturas:any[] = [];
  constructor(private facturasService: FacturasService) {
    facturasService.getFacturas()
    .subscribe(facturas => {
      for(const id$ in facturas){
        const f = facturas[id$];
        f.id$ = id$;
        this.facturas.push(facturas[id$]);
      }
      this.cargando = false;
    })
   }

  ngOnInit() {
  }

  eliminarFactura(id$){
    var continuar = confirm('Está seguro de eliminar la factura?');
    if (continuar == true){
      this.facturasService.deleteFactura(id$).subscribe(res => {
        this.facturas = [];
        this.facturasService.getFacturas()
        .subscribe(facturas => {
          for(const id$ in facturas){
            const f = facturas[id$];
            f.id$ = id$;
            this.facturas.push(facturas[id$]);
          }
        })
      });
    }
  }
}
