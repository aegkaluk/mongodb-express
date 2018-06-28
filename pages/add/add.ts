import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {        
    this.id = navParams.get('_id');
    this.name = navParams.get('name');
    this.surname = navParams.get('surname');
    this.age = navParams.get('age');
  }
  id:any;
  name:any;
  surname:any;
  age: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage _id: '+this.id);
    //console.log(this.navParams.get('name'));
  }
  save(): void {
    let student = {
      _id:this.id,
      name:this.name,
      surname: this.surname,
      age: this.age
    };
    this.viewCtrl.dismiss(student);
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

}
