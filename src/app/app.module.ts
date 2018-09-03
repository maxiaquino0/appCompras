import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from './config/firebase.config';

import { AppComponent } from './app.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { ListpresComponent } from './presupuestos/listpres/listpres.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import {AutenticacionService} from './servicios/autenticacion.service';
import { InisesComponent } from './autenticacion/inises/inises.component'
import { GuardService } from './servicios/guard.service';
import { FacturasModule } from './facturas/facturas.module';
import { FacturasComponent } from './facturas/facturas/facturas.component';
import { AddfactComponent } from './facturas/addfact/addfact.component';
import { EditfactComponent } from './facturas/editfact/editfact.component';
import { ViewfactComponent } from './facturas/viewfact/viewfact.component';
import { UploadComponent } from './upload/upload.component';
import { LoadfileService } from './servicios/loadfile.service';
import { ContratosComponent } from './contratos/contratos.component';
import { DetallesComponent } from './contratos/detalles/detalles.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'proveedores', component: ProveedoresComponent, canActivate: [GuardService]},
  {path: 'addprovee', component: AddproveeComponent, canActivate:[GuardService]},
  {path: 'addpres', component: AddpresComponent, canActivate:[GuardService]},
  {path: 'listpres', component: ListpresComponent, canActivate:[GuardService]},
  {path: 'editpres/:id', component: EditpresComponent, canActivate:[GuardService]},
  {path: 'registro', component: RegistroComponent},
  {path: 'iniciosesion', component: InisesComponent},
  {path: 'facturas', component: FacturasComponent, canActivate:[GuardService]},
  {path: 'addfact', component: AddfactComponent, canActivate:[GuardService]},
  {path: 'editfact/:id', component: EditfactComponent, canActivate:[GuardService]},
  {path: 'viewfact/:id', component: ViewfactComponent, canActivate:[GuardService]},
  {path: 'uploads', component: UploadComponent, canActivate:[GuardService]},
  {path: 'contratos', component: ContratosComponent, canActivate:[GuardService]},
  {path: '**', component: InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    AddproveeComponent,
    AddpresComponent,
    ListpresComponent,
    EditpresComponent,
    RegistroComponent,
    InisesComponent,
    UploadComponent,
    ContratosComponent,
    DetallesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FacturasModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ProveedoresService, PresupuestosService, AutenticacionService, GuardService, LoadfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
