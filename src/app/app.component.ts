import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, Events, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { LoginPage } from '../pages/login/login';
import { LessonsPage } from '../pages/lessons/lessons';
import { TopicPage } from '../pages/topic/topic';
import { CoursePage } from '../pages/course/course';
import { PracticePage } from '../pages/practice/practice';
import { TestPage } from '../pages/test/test';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { QrPage } from '../pages/qr/qr';

import { Oauth2Service } from '../services/oauth2.service';

import { UserModel } from '../models/user.model';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class TICSOR {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  user: UserModel;
  pages: Array<{ title: string, component: any, icon:  string}>;
  currentUser: UserModel;
  scannedCode :string;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public oauth2Service: Oauth2Service,
    public appCtrl: App,
    private barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController
  ) {
    this.initializeApp();
    this.user = new UserModel();

    events.subscribe('user:exist', (user) => {
      this.user = user;
    });  

    this.pages = [
      { title: 'Inicio', component: HomePage, icon: 'home' },
      { title: 'Temario', component: LessonsPage, icon: 'book' },
      { title: 'Práctica', component: PracticePage, icon: 'school' },
      { title: 'Nosotros', component: AboutusPage, icon: 'contact' }
    ];
  }
  createCode(){

  }
  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode= barcodeData.text;
      console.log(this.scannedCode);
      this.nav.setRoot(QrPage, { theme: this.scannedCode });
    })
    
  }
  ngOnInit() {
    if (this.user.isUser()) {
      this.user.get();
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
