import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, Slides } from 'ionic-angular';

import { TemaryService } from '../../services/temary.service';
import { TestPage } from '../test/test';

@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {

  reproduce;
  public content;
  public temary;
  public contentSelected;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private temaryService: TemaryService) {
    this.reproduce = "play";

    this.temary = navParams.get("temary");

    temaryService.getContent(this.temary.id)
      .subscribe((data) => {
        this.content = data.result;
        this.contentSelected = this.content[0];
      });
  }

  reproduceVideo(contentId) {
    (this.reproduce == "play") ? this.reproduce = "pause" : this.reproduce = "play";
    let vid: any = document.getElementById("video-" + contentId);

    let element = document.getElementById("video-" + contentId);

    if(!element.onended){
      element.onended = () => {
          (this.reproduce == "play") ? this.reproduce = "pause" : this.reproduce = "play";
      };
    }

    if (this.reproduce == "play") {
      vid.pause();
    } else {
      vid.play();
    }
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.contentSelected = this.content[currentIndex];
  }

  openTest(temary){
     this.navCtrl.push(TestPage, {
      temary: this.temary
    });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea tomar el test ahora?',
      message: 'Se evaluarán los puntos vistos en esta temática.',
      buttons: [
        {
          text: 'Mejor luego'
        },
        {
          text: 'Empezar',
          handler: () => {
            this.openTest(this.temary);
          }
        }
      ]
    });
    confirm.present();
  }
}
