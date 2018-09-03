import { Component, OnInit } from '@angular/core';
import {AngularFireList} from 'angularfire2/database';
import {LoadfileService} from '../servicios/loadfile.service';
import {Archivo} from '../upload/file.model';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  uploads: Archivo[];
  constructor(private loadfileService: LoadfileService) { }

  ngOnInit() {
    this.loadfileService.getUploads().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(fileUploads => {
      this.uploads = fileUploads;
    });
  }

}
