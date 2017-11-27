import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, Slides } from 'ionic-angular';

import { QrService } from '../../services/qr.service';
import { TestPage } from '../test/test';

@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html'
})
export class QrPage {

  reproduce;
  public content;
  public theme;

  @ViewChild(Slides) slides: Slides; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private qrService: QrService) {
    this.reproduce = "play";

     this.theme = navParams.get("theme");

    qrService.getQr(this.theme)
      .subscribe((data) => {
        console.log(data.result);
        this.content = data.result[0];
        this.content.images = JSON.parse(this.content.images);
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
   /*  let currentIndex = this.slides.getActiveIndex();
    this.contentSelected = this.content[currentIndex]; */
  }

 /*  openTest(temary){
     this.navCtrl.push(TestPage, {
      temary: this.temary
    });
  }
 */
  
}
