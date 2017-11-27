import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CoursePage } from '../course/course';
import { LoginPage } from '../../pages/login/login';

import { TemaryService } from '../../services/temary.service';

@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
})
export class TopicPage {

  public temary;

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController, private temaryService: TemaryService) {
    this.temary = navParams.get("temary");
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'TicSor',
      buttons: [
        {
          text: 'Cerrar Sesion',
          role: 'Close Sesion',
          handler: () => {
            localStorage.clear();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  openCourse() {
    this.navCtrl.push(CoursePage, {
      temary: this.temary
    });
  }  
}
