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
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TokenService } from './token-services';
import { Platform } from 'ionic-angular';
import { UtilProvider } from '../providers/util-provider';
import { Network } from '@ionic-native/network';
var ApiService = /** @class */ (function () {
    function ApiService(http, tokenService, platform, util, network
        /*public navCtrl: NavController, */
    ) {
        this.http = http;
        this.tokenService = tokenService;
        this.platform = platform;
        this.util = util;
        this.network = network;
        this.api_base_url = 'http://192.168.1.19:3310';
        this.wifi = true;
        /*  this.load(); */
    }
    /* 	load() {
        this.network.onDisconnect().subscribe(() => {
        console.log('network was disconnected :-(');
      this.util.presentToast('No tienes conexión a internet.');
        this.wifi = false;
        });
    
        //disconnectSubscription.unsubscribe();
        this.network.onConnect().subscribe(() => {
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            this.wifi = true;
          console.log('we got a wifi connection, woohoo!');
          }
        }, 3000);
        });
      } */
    ApiService.prototype.setHeaders = function () {
        var headersConfig = {
            'Content-Type': 'application/json'
        };
        if (this.tokenService.getToken()) {
            headersConfig['Authorization'] = "Bearer " + this.tokenService.getToken();
        }
        return new Headers(headersConfig);
    };
    ApiService.prototype.formatErrors = function (error) {
        return Observable.throw(error.json());
    };
    /** Métodos Http que hacen peticiones a la api y retornan observables */
    ApiService.prototype.get = function (path, params) {
        if (params === void 0) { params = new URLSearchParams(); }
        return this.http.get("" + this.api_base_url + path, { headers: this.setHeaders(), search: params })
            .catch(this.formatErrors)
            .map(function (res) { return res.json(); });
    };
    ApiService.prototype.put = function (path, body) {
        if (body === void 0) { body = {}; }
        return this.http.put("" + this.api_base_url + path, JSON.stringify(body), { headers: this.setHeaders() })
            .catch(this.formatErrors)
            .map(function (res) { return res.json(); });
    };
    ApiService.prototype.post = function (path, body) {
        if (body === void 0) { body = {}; }
        return this.http.post("" + this.api_base_url + path, body, { headers: this.setHeaders() })
            .catch(this.formatErrors)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('La petición ha fallado ' + res.status);
            }
            else {
                return res.json();
            }
        });
    };
    ApiService.prototype.delete = function (path) {
        return this.http.delete("" + this.api_base_url + path, { headers: this.setHeaders() })
            .catch(this.formatErrors)
            .map(function (res) { return res.json(); });
    };
    ApiService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            TokenService,
            Platform,
            UtilProvider,
            Network
            /*public navCtrl: NavController, */
        ])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api-service.js.map