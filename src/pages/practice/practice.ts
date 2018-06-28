import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TestPage } from '../test/test';

import { TemaryService } from '../../services/temary.service';
import { CourseService } from '../../services/course.service';
import { EvaluateService } from '../../services/evaluate.service';

@Component({
  selector: 'page-practice',
  templateUrl: 'practice.html',
})
export class PracticePage {

  public temary;
  public course;
  public evaluate: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private temaryService: TemaryService, private courseService: CourseService, private evaluateService: EvaluateService) {
    this.temaryService.getAll(1)
    .subscribe((data)=> {
      this.temary = data.result;
    }, (error) => {
      console.log(error);
    });

    this.evaluateService.getUserEvaluate()
      .subscribe((data) => {
        this.evaluate = data.result[0]; 
        console.log(this.evaluate);
      });

    this.courseService.getAll()
      .subscribe((data) => {
        this.course = data.result[0];
        //this.course.cursados = 7;
      });
  }

  openEvaluate(){
    if(!this.evaluate.evaluacion_usu_id){
      this.navCtrl.push(TestPage, { course: this.course, type: 1 });
    }
  }

  openTest(temary) {
    this.navCtrl.push(TestPage, { temary: temary });
  }  
  
  startTest(temary) {
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
            this.openTest(temary);
          }
        }
      ]
    });
    confirm.present();
  }

}
