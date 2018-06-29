import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private dataService:ServiceProvider,private camera:Camera) {        
    this.id = navParams.get('_id');
    this.name = navParams.get('name');
    this.surname = navParams.get('surname');
    this.age = navParams.get('age');
  }
  id:string;
  name:string;
  surname:string;
  age: string;
  imageURI:any;
  imagePath:any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage _id: '+this.id);
    //console.log(this.navParams.get('name'));
  }
  save(): void {
    //this.imagePath = this.dataService.uploadFile(this.imageURI);
    let student = {
      _id:this.id,
      name:this.name,
      surname: this.surname,
      age: this.age,
      impagPath :this.imagePath
    };    
    this.viewCtrl.dismiss(student);
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  getImage() {
    console.log("getImage()");
    const options : CameraOptions = {
      quality: 60,     
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{    
      this.imageURI =  imageData;
    },(err)=> {
      console.log(err);    
      this.dataService.presentToast(err);
    })  
    
  }

  

  

  /*
  uploadFile(){
    if(this.imageURICrop!=undefined){
        let loader = this.loadingCtrl.create({
          content:"Uploading.."
        })
        loader.present();
        const fileTransfer: FileTransferObject = this.transfer.create();
        
        let fileName = this.provider.createFileName();
        console.log(fileName);

        let options: FileUploadOptions = {
          fileKey: 'ionicfile', //php match $_FILES["ionicfile"]
          fileName: fileName,
          chunkedMode: false,
          mimeType: 'image/jpeg',
          headers: {}
        }

        let pathUpload = this.apiURL+"/upload/";
        
        fileTransfer.upload(this.imageURICrop,pathUpload,options)
            .then((data) => {
                console.log(data+" Uploaded Successfully");
                this.dataService.presentToast(data);//show object                
                this.imageURIuploaded = pathUpload+"/images/"+fileName;
                loader.dismiss();
            },(err) => {
                console.log(err);
                loader.dismiss();
                this.provider.presentToast(err);
            });
      }else{
        //this.provider.presentToast('Select or Take image ?');
      }
    }
    */




}
