import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { LoginPage } from '../../pages/login/login';
import { CourseService } from '../../services/course.service';
import { QrPage } from '../../pages/qr/qr';

import { LessonsPage } from '../lessons/lessons';
import { AboutusPage } from '../aboutus/aboutus';
import { NewsPage } from '../news/news';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public course: any;
  public user: UserModel;
  news: Array<{ title: string, img: string, url: string }>;
  scannedCode :string;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController, 
    private courseService: CourseService,
    private barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController) {
      this.news = [
        {title: 'Instituto nacional para sordos', img: 'assets/imgs/news/insor.png', url: 'http://www.insor.gov.co' },
        {title: 'Asociación de sordos del Caquetá', img: 'assets/imgs/news/asorca.png', url: 'https://www.fenascol.org.co/index.php/asociacion-de-sordos-del-caqueta' },
        {title: 'Federación nacional de sordeos de Colombia', img: 'assets/imgs/news/fenascol.png', url: 'https://www.fenascol.org.co/index.php' },
        {title: 'Centro de relevo', img: 'assets/imgs/news/relevo.jpg', url: 'http://www.centroderelevo.gov.co' },
        {title: 'Federación Mundial de Sordos', img: 'assets/imgs/news/wfdeaf.png', url: 'https://wfdeaf.org' },
        {title: 'Fundación Dime Colombia', img: 'assets/imgs/news/dime.png', url: 'http://www.dimecolombia.org' },
        {title: 'Fundación Eco', img: 'assets/imgs/news/eco.png', url: 'https://www.fundacioneco.es' }
        
      ];
    this.user = new UserModel();

    this.user.get();
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
  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode= barcodeData.text;
      console.log(barcodeData.text);
      this.navCtrl.setRoot(QrPage,{
        theme:  this.scannedCode
      });
    })
    
  }
  openTemario() {
    this.navCtrl.setRoot(LessonsPage);
  }  

  openAbout(){
    this.navCtrl.setRoot(AboutusPage);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'TicSor',
      buttons: [
        {
          text: '⊗ Cerrar Sesion',
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
