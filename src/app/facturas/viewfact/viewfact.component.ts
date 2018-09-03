import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { FacturasService } from '../servicio/facturas.service';

@Component({
  selector: 'app-viewfact',
  templateUrl: './viewfact.component.html',
  styleUrls: ['./viewfact.component.css']
})
export class ViewfactComponent implements OnInit {

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
    descuento: '',
    iva: '',
    total: ''
  }

  id: string;
  constructor(private formBuilder: FormBuilder, private facturasService: FacturasService,
    private router: Router, private activatedRoute: ActivatedRoute) {
      
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros['id'];
      this.facturasService.getFactura(this.id).subscribe(valor => this.factura = valor);
    });
  }

}
