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
import { NavController, Platform, Events } from 'ionic-angular';
import { App, Nav } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { UserModel } from '../../models/user.model';
import { Oauth2Service } from '../../services/oauth2.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token-services';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, appCtrl, nav, platform, oauth2Service, authService, network, appBrowser, events, tokenService) {
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.nav = nav;
        this.platform = platform;
        this.oauth2Service = oauth2Service;
        this.authService = authService;
        this.network = network;
        this.appBrowser = appBrowser;
        this.events = events;
        this.tokenService = tokenService;
        this.options = {
            location: 'no',
            hidden: 'no',
            clearcache: 'yes',
            clearsessioncache: 'yes',
            zoom: 'no',
            hardwareback: 'yes',
            mediaPlaybackRequiresUserAction: 'no',
            shouldPauseOnSuspend: 'no',
            closebuttoncaption: 'Close',
            disallowoverscroll: 'no',
            toolbar: 'yes',
            enableViewportScale: 'no',
            allowInlineMediaPlayback: 'no',
            presentationstyle: 'pagesheet',
            fullscreen: 'yes',
        };
        this.wifi = true;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.user = new UserModel();
        this.network.onDisconnect().subscribe(function () {
            _this.wifi = false;
        });
        //disconnectSubscription.unsubscribe();
        this.network.onConnect().subscribe(function () {
            setTimeout(function () {
                if (_this.network.type === 'wifi') {
                    _this.wifi = true;
                }
            }, 3000);
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.wifi) {
            this.platform.ready().then(function () {
                _this.chairaLogin().then(function (success) {
                    _this.oauth2Service.getAccessToken(success.detail)
                        .then(function (response) {
                        var scope = JSON.parse(response.scope)[0];
                        _this.authService.login(scope.NOMBRES, scope.APELLIDOS, scope.CORREO, scope.FOTO)
                            .subscribe(function (token) {
                            _this.user.save(scope);
                            _this.tokenService.saveToken(token.token);
                            _this.events.publish('user:exist', _this.user.get());
                            _this.nav.setRoot(HomePage);
                        }, function (error) { return console.log(error); });
                    })
                        .catch(function (error) { return console.log(error); });
                }, function (error) {
                    console.log(error);
                });
            });
        }
        else {
            //this.util.presentToast('No tienes conexión a internet.');
        }
    };
    LoginPage.prototype.chairaLogin = function () {
        var _this = this;
        var api_url = "http://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/auth?response_type=code&client_id=607027410088&redirect_uri=http://localhost/callback&state=xyz";
        return new Promise(function (resolve, reject) {
            var browserRef = _this.appBrowser.create(api_url, "_blank", _this.options);
            var closeSuccess = false;
            browserRef.on("loadstart").subscribe(function (event) {
                if ((event.url).indexOf("http://localhost/callback") === 0) {
                    closeSuccess = true;
                    browserRef.close();
                    var responseParameters = ((event.url).split("?")[1]).split("&");
                    if (responseParameters[0].indexOf('error') == -1) {
                        resolve({ detail: responseParameters[0].substring(5, responseParameters[0].length), state: 'OK' });
                    }
                    else if (responseParameters[0].substring(6, responseParameters[0].length) == 'access_denied') {
                        reject({ detail: 'Esta aplicación no esta autorizada.', state: 'error_noti' });
                    }
                    else {
                        console.log(responseParameters[0].substring(6, responseParameters[0].length));
                        reject({ detail: 'Lo sentimos ocurrió un problema, intentalo de nuevo.', state: 'error_noti' });
                    }
                }
            });
            browserRef.on("exit").subscribe(function (event) {
                if (!closeSuccess) {
                    reject({ detail: 'El usuario cancelo la autorización.', state: 'error' });
                }
            });
        });
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [NavController,
            App,
            Nav,
            Platform,
            Oauth2Service,
            AuthService,
            Network,
            InAppBrowser,
            Events,
            TokenService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map