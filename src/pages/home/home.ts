import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { LoginPage } from '../../pages/login/login';
import { CourseService } from '../../services/course.service';

import { LessonsPage } from '../lessons/lessons';
import { NewsPage } from '../news/news';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public course: any;
  public user: UserModel;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController, 
    private courseService: CourseService) {

    this.user = new UserModel();

    this.courseService.getAll()
      .subscribe((data) => {
        this.course = data.result[0];
        console.log(this.course);
      });
    /*if (!this.user.isUser()) {
      this.navCtrl.setRoot(LoginPage);
    } else { 
      this.user.get();
      this.courseService.getAll()
      .subscribe((data) => {
        this.course = data.result[0];
        console.log(this.course);
      });
    }*/
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
