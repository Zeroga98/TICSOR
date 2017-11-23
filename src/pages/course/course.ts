import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {
  reproduce;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController)  {
    this.reproduce = "play";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursePage');
  }
  reproduceVideo(){
    (this.reproduce == "play")?this.reproduce = "pause":this.reproduce = "play";
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea tomar el test ahora?',
      message: 'Se evaluarán los puntos vistos en esta temática.',
      buttons: [
        {
          text: 'Mejor luego',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Empezar',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
