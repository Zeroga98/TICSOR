var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { StringsProvider } from './strings-provider';
var UtilProvider = /** @class */ (function () {
    function UtilProvider(alertCtrl, loadingCtrl, toastCtrl, stringsProvider) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.stringsProvider = stringsProvider;
        this.loader = undefined;
        this.loader_cont = 0;
        this.strings = stringsProvider;
    }
    UtilProvider.prototype.getRangeDays = function (date, date2) {
        var p_date = date.split("-");
        var p_dat2 = date2.split("-");
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(parseInt(p_date[0]), parseInt(p_date[1]), parseInt(p_date[2]));
        var secondDate = new Date(parseInt(p_dat2[0]), parseInt(p_dat2[1]), parseInt(p_dat2[2]));
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    };
    UtilProvider.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    UtilProvider.prototype.loading = function () {
        this.loader_cont++;
        if (this.loader == undefined) {
            this.loader = this.loadingCtrl.create({
                content: "Cargando",
                dismissOnPageChange: false
            });
            this.loader.present();
        }
        return this.loader;
    };
    UtilProvider.prototype.loadingDismiss = function () {
        this.loader_cont--;
        if (this.loader_cont == 0) {
            this.loader.dismiss();
            this.loader = undefined;
        }
    };
    ;
    UtilProvider.prototype.showError = function (title, text) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        /* 		alert.present(prompt); */
    };
    UtilProvider.prototype.alertCheckbox = function (data, callback) {
        var alert = this.alertCtrl.create();
        alert.setTitle('Agregar o eliminar roles');
        for (var i = 0; i < data.length; ++i) {
            alert.addInput({
                type: 'checkbox',
                label: data[i].label,
                value: data[i].label,
                checked: data[i].check
            });
        }
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'Listo',
            handler: function (data) {
                callback(data);
            }
        });
        alert.present();
    };
    UtilProvider.prototype.camelCase = function (text) {
        return (text.substring(0, 1).toUpperCase() + text.substring(1, text.length));
    };
    UtilProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AlertController,
            LoadingController,
            ToastController,
            StringsProvider])
    ], UtilProvider);
    return UtilProvider;
}());
export { UtilProvider };
//# sourceMappingURL=util-provider.js.map