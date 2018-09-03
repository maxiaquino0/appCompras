import { Component, OnInit } from '@angular/core';

import {Archivo} from './file.model';
import {LoadfileService} from '../servicios/loadfile.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Archivo;
  loading = false;  
  file: any;
  constructor(public loadfileService: LoadfileService) { }

  ngOnInit() {
  }

  uploadSingle(){
    var file: File = this.selectedFiles.item(0);
    this.currentUpload = new Archivo(file);
    this.loading = true;
    this.loadfileService.pushUpload(this.currentUpload);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
}
