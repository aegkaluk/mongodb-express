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
    this.id = navParams.get('_id');
    this.name = navParams.get('name');
    this.surname = navParams.get('surname');
    this.age = navParams.get('age');    
    this.mediaPath = this.dataService.getMediaPath(); 
      console.log(navParams.get('imageName'));
      if(navParams.get('imageName')!=undefined && navParams.get('imageName')!=null){
        this.imageName = navParams.get('imageName');         
        this.imageURI = this.mediaPath+"/"+navParams.get('imageName');
      }else{
        this.imageURI = this.mediaPath+"/default.jpg";
      }
  }
  id:string;
  name:string;
  surname:string;
  age: string;
  imageUpload:any;
  imageURI:any;
  imageName:any;
  mediaPath:any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage _id: '+this.id);
    //console.log(this.navParams.get('name'));
  }
  save(): void {    
    this.uploadFile();
    let student = {
      _id:this.id,
      name:this.name,
      surname: this.surname,
      age: this.age,
      imageName :this.imageName
    };    
    this.viewCtrl.dismiss(student); 
    
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  getImage() {
    console.log("getImage()");
    const options : CameraOptions = {
      quality: 75,     
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{    
      this.imageUpload =  imageData;      
      this.imageURI = imageData;
      this.imageName = this.dataService.createFileName();
    },(err)=> {
      console.log(err);    
      this.dataService.presentToast(err);
    })  
    
  }
  
  uploadFile(){
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
                //return pathUpload+"/images/"+this.imageName;
            },(err) => {
                console.log(err);
                loader.dismiss();               
                //this.presentToast(err);
            });
      }
  }

  clearImage(){
    this.imageURI = undefined;
    this.imageName = undefined;
    this.imageUpload = undefined;
  }

  

}
