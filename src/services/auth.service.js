var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { ApiService } from './api-service';
var AuthService = /** @class */ (function () {
    function AuthService(http, api) {
        this.api = api;
        this.http = http;
        this.data = null;
    }
    AuthService.prototype.login = function (names, lastnames, email, picture) {
        return this.api.post('/user/login', {
            nombres: names,
            apellidos: lastnames,
            correo: email,
            foto: picture
        });
    };
    AuthService.prototype.handleError = function (error) {
        console.log(error);
        return error.json().message || 'Server error, please try again later';
    };
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, ApiService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map