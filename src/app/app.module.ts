import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule }    from '@angular/http';

import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { LoginPage } from '../pages/login/login';
import { LessonsPage } from '../pages/lessons/lessons';
import { Oauth2Service } from '../services/oauth2.service';
import { ApiService } from '../services/api-service';
import { TokenService } from '../services/token-services';
import { UtilProvider } from '../providers/util-provider';
import { StringsProvider } from '../providers/strings-provider';
import { TopicPage } from '../pages/topic/topic';
import { CoursePage } from '../pages/course/course';
import { PracticePage } from '../pages/practice/practice';
import { TestPage } from '../pages/test/test';

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
    CoursePage,
    PracticePage,
    TestPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    CoursePage,
    PracticePage,
    TestPage
  ],
  providers: [
    GooglePlus,
    InAppBrowser,
    Network,
    StatusBar,
    ApiService,
    TokenService,
    Oauth2Service,
    UtilProvider,
    StringsProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(private statusBar: StatusBar) {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleLightContent();
    this.statusBar.styleBlackTranslucent();
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#002200'); 
  }
}