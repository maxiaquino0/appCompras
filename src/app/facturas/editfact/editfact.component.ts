import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { FacturasService } from '../servicio/facturas.service';
import { ProveedoresService } from '../../servicios/proveedores.service';



@Component({
  selector: 'app-editfact',
  templateUrl: './editfact.component.html',
  styleUrls: ['./editfact.component.css']
})
export class EditfactComponent implements OnInit {

  facturaForm: FormGroup;
  factura:any={
    nrofactura: '',
    nombre: '',
    nif: '',
    fechaexpedicion: '',
    fechaoperacion: '',
    descripcion: '',
    cantidad: '',
    precioporunidad: '',
    descuento: '0',
    iva: ''
  }
  cantidad:any;
  precioporunidad:any;
  descuento:any;
  iva:any;
  total:any=0;

  id: string;
  proveedores: any[]=[];
  constructor(private formBuilder: FormBuilder, private facturasService: FacturasService,
    private router: Router, private activatedRoute: ActivatedRoute, private proveedoresService: ProveedoresService) {
      proveedoresService.getProveedores().subscribe(proveedores => {
        for(const id$ in proveedores){
          const p = proveedores[id$];
          p.id$ = id$;
          this.proveedores.push(proveedores[id$]);
        }
      })
      activatedRoute.params.subscribe(parametros => {
        this.id = parametros['id'];
      });
  }

  ngOnInit() {
    this.facturasService.getFactura(this.id).subscribe(valor => {
      this.factura = valor;
      this.facturaForm = this.formBuilder.group({
        nrofactura: [this.factura.nrofactura, Validators.required],
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

  saveFactura(){
    const saveFactura = {
      nrofactura:this.facturaForm.get('nrofactura').value,
      nombre:this.facturaForm.get('nombre').value,
      nif:this.facturaForm.get('nif').value,
      fechaexpedicion:this.facturaForm.get('fechaexpedicion').value,
      fechaoperacion:this.facturaForm.get('fechaoperacion').value,
      descripcion:this.facturaForm.get('descripcion').value,
      cantidad:this.facturaForm.get('cantidad').value,
      precioporunidad:this.facturaForm.get('precioporunidad').value,
      descuento:this.facturaForm.get('descuento').value,
      iva:this.facturaForm.get('iva').value,
      total:this.facturaForm.get('total').value
    }
    return saveFactura;
  }

  onSubmit(){
    this.factura = this.saveFactura();
    this.facturasService.putFactura(this.factura, this.id).subscribe(newfact => {
      this.router.navigate(['/facturas'])
    })
  }

}
