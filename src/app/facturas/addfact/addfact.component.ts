import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturasService } from '../servicio/facturas.service';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-addfact',
  templateUrl: './addfact.component.html',
  styleUrls: ['./addfact.component.css']
})
export class AddfactComponent implements OnInit {

  facturaForm: FormGroup;
  factura: any;
  fechaoperacion: any;

  cantidad:any;
  precioporunidad: any;
  descuento:any=0;
  iva:any
  total: any = 0;
  nrofactura: number = 0;

  proveedores: any[]=[];
  constructor(private formBuilder: FormBuilder, private facturasService: FacturasService,
    private proveedoresService: ProveedoresService, private router: Router ) {
    proveedoresService.getProveedores().subscribe(proveedores => {
      for(const id$ in proveedores){
        const p = proveedores[id$];
        p.id$ = id$;
        this.proveedores.push(proveedores[id$]);
      }
    })
  }

  ngOnInit() {
    this.facturasService.getFacturas()
      .subscribe(facturas => {
        for(const id$ in facturas){
          this.nrofactura = this.nrofactura + 1;
        }
        this.nrofactura = this.nrofactura + 1
        this.facturaForm = this.formBuilder.group({
          nrofactura: this.nrofactura,
          nombre: ['', Validators.required],
          nif: ['', Validators.required],
          fechaexpedicion: ['', Validators.required],
          fechaoperacion: ['', Validators.required],
          descripcion: ['', Validators.required],
          cantidad: ['', Validators.required],
          precioporunidad: ['', Validators.required],
          descuento: ['0', Validators.required],
          iva: ['', Validators.required],
          total: this.total
        });
      });    
    this.onChanges();
  }

  onSubmit(){
    this.factura = this.saveFactura();
    this.facturasService.postFactura(this.factura).subscribe(newfact=>{
      this.factura = {};
      this.facturaForm.reset();
      this.nrofactura = 0;
      this.router.navigate(['/facturas']);
    });
  }

  saveFactura(){
    const saveFactura = {
      nrofactura: this.nrofactura,
      nombre: this.facturaForm.get('nombre').value,
      nif: this.facturaForm.get('nif').value,
      fechaexpedicion: this.facturaForm.get('fechaexpedicion').value,
      fechaoperacion: this.facturaForm.get('fechaoperacion').value,
      descripcion: this.facturaForm.get('descripcion').value,
      cantidad: this.facturaForm.get('cantidad').value,
      precioporunidad: this.facturaForm.get('precioporunidad').value,
      descuento: this.facturaForm.get('descuento').value,
      iva: this.facturaForm.get('iva').value,
      total: this.facturaForm.get('total').value
    }
    return saveFactura;
  }

  onChanges():void{
    this.facturaForm.valueChanges.subscribe(valor => {
      this.facturaForm.value.fechaoperacion = valor.fechaexpedicion;
      this.cantidad = valor.cantidad;
      this.precioporunidad = valor.precioporunidad;
      this.descuento = valor.descuento;
      this.iva = valor.iva;
      this.facturaForm.value.total = (this.cantidad*this.precioporunidad) + (this.cantidad*this.precioporunidad)*this.iva - this.descuento;
    })
  }
}
