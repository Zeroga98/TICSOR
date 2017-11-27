import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { TopicPage } from '../topic/topic';

import { TemaryService } from '../../services/temary.service';

@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html'
})
export class LessonsPage {

  private temary: any[];

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController, 
    private temaryService: TemaryService) {

    this.temaryService.getAll(1)
    .subscribe((data)=> {
      console.log(data);
      this.temary = data.result;
      console.log(this.temary);
    }, (error) => {
      console.log(error);
    });
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
