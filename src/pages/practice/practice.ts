import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TestPage } from '../test/test';


@Component({
  selector: 'page-practice',
  templateUrl: 'practice.html',
})
export class PracticePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PracticePage');
  }
  openTest() {
    this.navCtrl.setRoot(TestPage);
  }  
  
  startTest() {
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
            this.openTest();
          }
        }
      ]
    });
    confirm.present();
  }

}
