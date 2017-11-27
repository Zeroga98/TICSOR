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
import { TestPage } from '../test/test';
var PracticePage = /** @class */ (function () {
    function PracticePage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
    }
    PracticePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PracticePage');
    };
    PracticePage.prototype.openTest = function () {
        this.navCtrl.setRoot(TestPage);
    };
    PracticePage.prototype.startTest = function () {
        var _this = this;
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
                        _this.openTest();
                    }
                }
            ]
        });
        confirm.present();
    };
    PracticePage = __decorate([
        Component({
            selector: 'page-practice',
            templateUrl: 'practice.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController])
    ], PracticePage);
    return PracticePage;
}());
export { PracticePage };
//# sourceMappingURL=practice.js.map