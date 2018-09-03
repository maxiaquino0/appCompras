import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';


@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})
export class AddproveeComponent implements OnInit {
  
  proveedorForm: FormGroup;
  proveedor: any;
  constructor(private formBuilder: FormBuilder, private proveedoresService: ProveedoresService) {}

  ngOnInit() {
    this.proveedorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contacto: ['', Validators.required]
    });
  }

  onSubmit(){
    this.proveedor = this.saveProveedor();
    this.proveedoresService.postProveedor(this.proveedor).subscribe(newprov => {});
    this.proveedorForm.reset();
  }

  saveProveedor(){
    const saveProveedor={
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      codigoPostal: this.proveedorForm.get('codigoPostal').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    };
    return saveProveedor;
  }

  provincias: string[] = [
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona',
    'Burgos', 'Cáceres', 'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba',
    'La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','IslasBaleares','Jaén','León','Lérida','Lugo',
    'Madrid', 'Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas',
    'Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora','Zaragoza'
  ]
}
