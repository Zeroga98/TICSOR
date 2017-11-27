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
import { NavController, NavParams, AlertController } from 'ionic-angular';
var CoursePage = /** @class */ (function () {
    function CoursePage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.reproduce = "play";
    }
    CoursePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CoursePage');
    };
    CoursePage.prototype.reproduceVideo = function () {
        (this.reproduce == "play") ? this.reproduce = "pause" : this.reproduce = "play";
    };
    CoursePage.prototype.showConfirm = function () {
        var confirm = this.alertCtrl.create({
            title: '¿Desea tomar el test ahora?',
            message: 'Se evaluarán los puntos vistos en esta temática.',
            buttons: [
                {
                    text: 'Mejor luego',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Empezar',
                    handler: function () {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    CoursePage = __decorate([
        Component({
            selector: 'page-course',
            templateUrl: 'course.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController])
    ], CoursePage);
    return CoursePage;
}());
export { CoursePage };
//# sourceMappingURL=course.js.map