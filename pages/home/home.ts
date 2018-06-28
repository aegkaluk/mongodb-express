import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  students:Array<any>;
  indx:string;

  constructor(public navCtrl: NavController,private dataService: ServiceProvider,public modalCtrl:ModalController) {
    this.onLoad();
  }

  addPage(indx){
    console.log('addPage() indx: '+indx);
    this.indx = indx;
    let modal = this.modalCtrl.create(AddPage,this.students[indx]);

    modal.onDidDismiss(student => {
      if(student){
        //console.log("onDidDismiss: ",student);
        if(student.id!=undefined){
            this.dataService.updateData(student).subscribe(res => {
              console.log("indx:"+this.indx);
              this.students[indx] = student;
              console.log(res);
            })
        }else{
            this.dataService.addData(student).subscribe(res =>{
              console.log(res);
              this.students.push(student);
            })
        }
        
      }
    })
    modal.present();

  }

  onLoad(){
    this.dataService.getData().subscribe(res=>{
        this.students = res.message;
        console.log(res.message);
    })
  }

  deleteData(student):void{
    let index = this.students.indexOf(student);
    if(index>-1){
      this.students.splice(index,1); //Remove ion-item from ion-list
    }
    this.dataService.deleteData(student._id).subscribe(res => {
        console.log(res);
    })

  }


}
