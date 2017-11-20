import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {
  reproduce;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reproduce = "play";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursePage');
  }
  reproduceVideo(){
    (this.reproduce == "play")?this.reproduce = "pause":this.reproduce = "play";
  }

}
