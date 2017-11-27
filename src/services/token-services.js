var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var TokenService = /** @class */ (function () {
    function TokenService() {
    }
    TokenService.prototype.getToken = function () {
        return window.localStorage['token'];
    };
    TokenService.prototype.saveToken = function (token) {
        window.localStorage['token'] = token;
    };
    TokenService.prototype.destroyToken = function () {
        window.localStorage.removeItem('token');
    };
    // Decodifica el Token y retorna el Payload como tipo usuario
    TokenService.prototype.getPayload = function () {
        var token = this.getToken();
        if (token && 3 === token.split(".").length) {
            return (JSON.parse(decodeURIComponent(window.atob(token.split(".")[1].replace("-", "+").replace("_", "/")))));
        }
    };
    // Verifica la vigencia del Token
    TokenService.prototype.verify = function () {
        var token = this.getPayload();
        return token && token['exp'] ? Math.round((new Date).getTime() / 1E3) <= token['exp'] ? true : false : (console.log("Las credenciales de acceso no son validas"), false);
    };
    TokenService = __decorate([
        Injectable()
    ], TokenService);
    return TokenService;
}());
export { TokenService };
//# sourceMappingURL=token-services.js.map