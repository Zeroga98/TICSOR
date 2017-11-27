var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CoursePage } from '../course/course';
import { LoginPage } from '../../pages/login/login';
import { TemaryService } from '../../services/temary.service';
var TopicPage = /** @class */ (function () {
    function TopicPage(navCtrl, navParams, actionSheetCtrl, temaryService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.temaryService = temaryService;
        this.temary = navParams.get("temary");
        console.log(this.temary);
    }
    TopicPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'TicSor',
            buttons: [
                {
                    text: 'Cerrar Sesion',
                    role: 'Close Sesion',
                    handler: function () {
                        localStorage.clear();
                        _this.navCtrl.setRoot(LoginPage);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    TopicPage.prototype.openCourse = function () {
        this.navCtrl.push(CoursePage, {
            temary: this.temary
        });
    };
    TopicPage = __decorate([
        Component({
            selector: 'page-topic',
            templateUrl: 'topic.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ActionSheetController, TemaryService])
    ], TopicPage);
    return TopicPage;
}());
export { TopicPage };
//# sourceMappingURL=topic.js.map