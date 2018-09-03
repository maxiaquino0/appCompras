import { Component, OnInit, Input } from '@angular/core';
import {Archivo} from '../../upload/file.model';
import {LoadfileService} from '../../servicios/loadfile.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Input() upload: Archivo
  
  constructor(private loadFileService: LoadfileService) { }

  ngOnInit() {}

  deleteUpload(upload, key){
    var continuar = confirm('Está seguro de eliminar el contrato?');
    if(continuar == true){
      this.loadFileService.deleteUpload(this.upload, key);
    }
    
  }
}
