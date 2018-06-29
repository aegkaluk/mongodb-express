import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  students:any;  
  indx:string;  
  mediaPath:string;  

  constructor(public navCtrl: NavController,private dataService: ServiceProvider,public modalCtrl:ModalController) {
    //this.students = [];
    this.onLoad();
  }

  addPage(indx){
    console.log('addPage() indx: '+indx);
    this.indx = indx;
    let modal = this.modalCtrl.create(AddPage,this.students[indx]);

    modal.onDidDismiss(student => {      
      if(student){      
        if(student.name==undefined && student.surname==undefined && student.age==undefined){
          this.dataService.presentToast("Can't add");
          return;
        }  
        //console.log("onDidDismiss: ",student);
        //this.dataService.presentToast("student id:"+student.id);
        if(student._id!=undefined && student._id!=''){           
            this.dataService.updateData(student).subscribe(res => {
              //console.log("indx:"+this.indx);
              this.students[indx] = student;
              this.dataService.presentToast("updated: "+student.name);
              console.log(res);
            })
        }else{          
            this.dataService.addData(student).subscribe(res =>{              
              this.students.push(student);
              this.dataService.presentToast("added: "+student.name);
              console.log(res);
            })
        }
        
      }
    })
    modal.present();

  }
  
  onLoad(){
    this.dataService.getData().subscribe(res => {      
        let Res:any = res;
        this.students = Res.message;
        this.dataService.setMediaPath(Res.mediaPath);
        this.mediaPath = this.dataService.getMediaPath(); 
        //console.log("mediaPath: ",Res.mediaPath);
        //console.log(Res.message);
    })
  }

  deleteData(student):void{
    let index = this.students.indexOf(student);
    if(index>-1){
      this.students.splice(index,1); //Remove ion-item from ion-list
    }
    this.dataService.deleteData(student._id).subscribe(res => {
        console.log(res);
        this.dataService.presentToast("deleted: "+student.name);
    })

  }


}
