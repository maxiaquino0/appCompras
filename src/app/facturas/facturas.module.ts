import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { FacturasComponent } from './facturas/facturas.component';
import { FacturasService } from './servicio/facturas.service';
import { AddfactComponent } from './addfact/addfact.component';
import { EditfactComponent } from './editfact/editfact.component';
import { ViewfactComponent } from './viewfact/viewfact.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [FacturasComponent, AddfactComponent, EditfactComponent, ViewfactComponent],
  exports: [FacturasComponent],
  providers: [FacturasService]
})
export class FacturasModule { }
