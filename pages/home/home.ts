import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items:Array<any>;
  constructor(public navCtrl: NavController,private dataService: ServiceProvider,public modalCtrl:ModalController) {
    this.onLoad();
  }

  addPage(){
    let modal = this.modalCtrl.create(AddPage);

    modal.onDidDismiss(student => {
      if(student){
        console.log("onDidDismiss: ",student);
        //this.reviewService.createReview(review);
        //this.reviews.push(review);        
      }
    })
    modal.present();

  }
  onLoad(){
    this.dataService.getData().subscribe(res=>{
        console.log(res.message);
    })
  }


}
