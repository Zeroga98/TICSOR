import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { LoginPage } from '../pages/login/login';
import { LessonsPage } from '../pages/lessons/lessons';
import { TopicPage } from '../pages/topic/topic';
import { CoursePage } from '../pages/course/course';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/** Componentes */
import { TICSOR } from './app.component';
/*import { NotDataComponent } from '../components/not-data/not-data';*/

@NgModule({
  declarations: [
    TICSOR,
    HomePage,
    NewsPage,
    LoginPage,
    LessonsPage,
    TopicPage,
    CoursePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TICSOR),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TICSOR,
    HomePage,
    NewsPage,
    LoginPage,
    LessonsPage,
    TopicPage,
    CoursePage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
