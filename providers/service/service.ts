import { HttpClient } from '@angular/common/http'; //HttpHeaders
import { Injectable } from '@angular/core';
import { ToastController,LoadingController } from 'ionic-angular';
import "rxjs/add/operator/map";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: HttpClient,public toastCtrl: ToastController,private camera:Camera,public loadingCtrl: LoadingController,private transfer: FileTransfer) {
    console.log('Hello ServiceProvider Provider');
  }

  //serverURL:string = "http://localhost:8081";
  serverURL:string = "https://gentle-escarpment-92556.herokuapp.com";
  mediaPath:string;

  getData(){
    console.log("getData()");
    return this.http.get(this.serverURL+'/show').map(res => res );
  }

  addData(student){
    console.log("addData()");    
    return this.http.post(this.serverURL+'/add',student).map(res => res );
  }

  updateData(student){
    console.log("updateData()"+student._id);
    return this.http.put(this.serverURL+'/update/'+student._id, student).map(res=>res);
  }

  deleteData(id){
    console.log("deleteData() id:"+id);
    return this.http.delete(this.serverURL+'/delete/'+id).map(res => res );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({        
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

getMediaPath(){
  return this.mediaPath;
}  
setMediaPath(val){
  this.mediaPath = val;
}

 createFileName(){
    var d = new Date(),
    n = d.getTime(),
    newFileName=n+".jpg";
    return newFileName;
  }

 pathUpload(){
   return "http://cloud.phuket-it.com/api/dev";
 }

 getMatchJobs(){
  return this.http.get('assets/data/jobs-match.json').map(res => res);
 
  }


}
