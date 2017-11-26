import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { LoginPage } from '../pages/login/login';
import { LessonsPage } from '../pages/lessons/lessons';
import { TopicPage } from '../pages/topic/topic';
import { UserModel } from '../models/user.model';
import { CoursePage } from '../pages/course/course';
import { PracticePage } from '../pages/practice/practice';
import { TestPage } from '../pages/test/test';

@Component({
  templateUrl: 'app.html'
})
export class TICSOR {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  user: UserModel;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events) {
    this.initializeApp();
    this.user = new UserModel();

    events.subscribe('user:exist', (user) => {
      this.user = user;
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Noticias', component: NewsPage },
      { title: 'Temario', component: LessonsPage },
      { title: 'Tema', component: TopicPage },
      { title: 'Curso', component: CoursePage },
      { title: 'Práctica', component: PracticePage },
      { title: 'Test', component: TestPage }
    ];

  }

  ngOnInit() {
     /* if(!this.user.isUser()){
        this.nav.setRoot(LoginPage);
      } else {*/
        this.user.get();
        console.log(this.user);
      //}
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  

}
