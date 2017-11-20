import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { TopicPage } from '../topic/topic';

@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html'
})
export class LessonsPage {
  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {

  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'TicSor',
      buttons: [
        {
          text: 'Cerrar Sesion',
          role: 'Close Sesion',
          handler: () => {
            console.log('Destructive clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  openTopic() {
    this.navCtrl.setRoot(TopicPage);
  }
  
}
