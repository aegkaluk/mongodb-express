import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private dataService:ServiceProvider,private camera:Camera,public loadingCtrl: LoadingController,private transfer: FileTransfer) {        
    this._id = navParams.get('_id');
    this.name = navParams.get('name');
    this.surname = navParams.get('surname');
    this.age = navParams.get('age');    
    this.imageName = navParams.get('imageName');
    this.mediaPath = this.dataService.getMediaPath(); 
  }
  _id:string;
  name:string;
  surname:string;
  age: string;
  imageUpload:any;
  imageURI:any;
  imageName:any;
  mediaPath:any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage _id: '+this._id);
    console.log(this.imageName);
    if(this.imageName!=undefined && this.imageName!=null){   
      this.imageURI = this.mediaPath+"/"+this.imageName;
    }else{
      this.imageURI = this.mediaPath+"/default.jpg";
    }
    //console.log(this.navParams.get('name'));
  }
  save(): void {    
    this.saveData();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  getImage() {
    console.log("getImage()");    
    const options : CameraOptions = {
      quality: 50,     
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{    
      this.imageURI = imageData;
      this.imageUpload =  imageData;  
      this.imageName = this.dataService.createFileName();
    },(err)=> {
      console.log(err);    
      this.dataService.presentToast(err);
    })  
    
  }
  
  saveData(){
    if(this.imageUpload!=undefined && this.imageUpload!=""){
        let loader = this.loadingCtrl.create({
          content:"Saving.."
        })
        loader.present();

        const fileTransfer: FileTransferObject = this.transfer.create();       

        let options: FileUploadOptions = {
          fileKey: 'ionicfile', //php match $_FILES["ionicfile"]
          fileName: this.imageName,
          chunkedMode: false,
          mimeType: 'image/jpeg',
          headers: {}
        }
        //let pathUpload = this.dataService.pathUpload+"/upload/";        
        fileTransfer.upload(this.imageUpload,this.mediaPath+'/',options)
            .then((data) => {
                console.log(data+" Uploaded Successfully");                
                loader.dismiss();    
                this.callBackHome();            
                //return pathUpload+"/images/"+this.imageName;
            },(err) => {
                console.log(err);
                loader.dismiss();               
                //this.presentToast(err);
            });
      }else{
        this.callBackHome();
      }
  }

  callBackHome(){
    let student = {
      _id:this._id,
      name:this.name,
      surname: this.surname,
      age: this.age,
      imageName :this.imageName
    };    
    this.viewCtrl.dismiss(student); 
  }

  clearImage(){
    this.imageURI = undefined;
    this.imageName = undefined;
    this.imageUpload = undefined;
  }

  

}
