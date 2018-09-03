import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import * as firebase from 'firebase';
import {Archivo} from '../upload/file.model';


@Injectable({
  providedIn: 'root'
})
export class LoadfileService {

  private basePath: string = '/uploads';
  uploads: any;
  constructor(public angularFireDatabase: AngularFireDatabase) { }

  pushUpload(upload: Archivo){
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      },
      (error) => {
        //upload file error
        console.log(error);
      },
      () => {
        //upload succes
        upload.name = upload.file.name;
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          upload.url = downloadURL;
          //this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
          const dbRef = firebase.database().ref('uploads');
          const newfile = dbRef.push();
          newfile.set(upload);
        });
      }
    );
    //this.saveFileData(upload);
  }

  getUploads():AngularFireList<Archivo>{
    return this.angularFireDatabase.list(this.basePath, ref => ref.limitToLast(10));
  }

  private deleteFileData(key: string){
    return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
  } 

  private deleteFileStorage(name: string){
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

  deleteUpload(upload: Archivo, key: string){
    this.deleteFileData(key).then(() =>{
      this.deleteFileStorage(upload.name);
    }).catch(error => console.log(error));
  }
}
