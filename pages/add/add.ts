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
    this.mediaPath = this.dataService.getMediaPath(); 
    this._id = this.navParams.get('_id');
    this.name = this.navParams.get('name');
    this.surname = this.navParams.get('surname');
    this.age = this.navParams.get('age');    
    this.imageName = this.navParams.get('imageName');
    console.log('ionViewDidLoad AddPage _id: '+this._id);    
    console.log("imageName: "+this.imageName);

    if(this.imageName!=undefined && this.imageName!=null){   
      this.imageURI = this.mediaPath+"/"+this.imageName;
    }else if(this._id!=undefined && this._id!=null){
      this.imageURI = this.mediaPath+"/default.jpg";
    }
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
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{    
      this.imageURI = "data:image/jpeg;base64," + imageData; //user DATA_URL
      //this.imageURI = imageData; //user FILE_URL
      this.imageUpload =  this.imageURI;  
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
