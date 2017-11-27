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
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { LoginPage } from '../../pages/login/login';
import { CourseService } from '../../services/course.service';
import { LessonsPage } from '../lessons/lessons';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, actionSheetCtrl, courseService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.courseService = courseService;
        this.user = new UserModel();
        this.courseService.getAll()
            .subscribe(function (data) {
            _this.course = data.result[0];
            console.log(_this.course);
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
    HomePage.prototype.openTemario = function () {
        this.navCtrl.setRoot(LessonsPage);
    };
    HomePage.prototype.presentActionSheet = function () {
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
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            ActionSheetController,
            CourseService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map