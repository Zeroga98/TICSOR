var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { LoginPage } from '../pages/login/login';
import { LessonsPage } from '../pages/lessons/lessons';
import { Oauth2Service } from '../services/oauth2.service';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { TemaryService } from '../services/temary.service';
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
var AppModule = /** @class */ (function () {
    function AppModule(statusBar) {
        this.statusBar = statusBar;
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        this.statusBar.styleLightContent();
        this.statusBar.styleBlackTranslucent();
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#002200');
    }
    AppModule = __decorate([
        NgModule({
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
                TemaryService,
                Oauth2Service,
                AuthService,
                CourseService,
                UtilProvider,
                StringsProvider,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        }),
        __metadata("design:paramtypes", [StatusBar])
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map