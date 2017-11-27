import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, Events } from 'ionic-angular';
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
import { Oauth2Service } from '../services/oauth2.service';

import { UserModel } from '../models/user.model';

@Component({
  templateUrl: 'app.html'
})
export class TICSOR {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  user: UserModel;
  pages: Array<{title: string, component: any}>;
  currentUser: UserModel;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public events: Events,
    public oauth2Service: Oauth2Service,
    public appCtrl: App
  ){
    this.initializeApp();
    this.getUserProfile();

  /*   events.subscribe('user:exist', (user) => {
      this.user = user;
    }); */

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

/*   ngOnInit() {
      if(!this.user.isUser()){
        this.nav.setRoot(LoginPage);
      } else {
        this.user.get();
        console.log(this.user);
      }
   }
 */
  initializeApp() {
    this.oauth2Service.populate(); 
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.oauth2Service.currentUser.subscribe((userData) => { 
      this.currentUser = userData;
    });
  }

  openPage(page) {
    this.appCtrl.getRootNav().setRoot(page.component).catch(err => {
      console.log(err);
      this.appCtrl.getRootNav().setRoot(LoginPage);
    });
  }
  
  private getUserProfile(){
    this.oauth2Service.getUser().subscribe(
        data => {
          if(data != undefined && data[0].status != 'ERROR'){
            

            this.oauth2Service.setCurrentUser(this.currentUser);
            
          } else if(data[0].type == 'token_null'){
            console.log("No esta logeado");
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
