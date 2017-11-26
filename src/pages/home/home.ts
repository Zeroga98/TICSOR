import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { LoginPage } from '../../pages/login/login';

import { LessonsPage } from '../lessons/lessons';
import { NewsPage } from '../news/news';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: UserModel;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {

    this.user = new UserModel();
    this.user.get();
  }
  openTemario() {
    this.navCtrl.setRoot(LessonsPage);
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
}
