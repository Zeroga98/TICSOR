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
import { TopicPage } from '../topic/topic';
import { TemaryService } from '../../services/temary.service';
var LessonsPage = /** @class */ (function () {
    function LessonsPage(navCtrl, actionSheetCtrl, temaryService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.temaryService = temaryService;
        this.temaryService.getAll(1)
            .subscribe(function (data) {
            _this.temary = data.result;
        }, function (error) {
            console.log(error);
        });
    }
    LessonsPage.prototype.presentActionSheet = function () {
        var actionSheet = this.actionSheetCtrl.create({
            title: 'TicSor',
            buttons: [
                {
                    text: 'Cerrar Sesion',
                    role: 'Close Sesion',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    LessonsPage.prototype.openTopic = function (temary) {
        this.navCtrl.push(TopicPage, {
            temary: temary
        });
    };
    LessonsPage = __decorate([
        Component({
            selector: 'page-lessons',
            templateUrl: 'lessons.html'
        }),
        __metadata("design:paramtypes", [NavController,
            ActionSheetController,
            TemaryService])
    ], LessonsPage);
    return LessonsPage;
}());
export { LessonsPage };
//# sourceMappingURL=lessons.js.map