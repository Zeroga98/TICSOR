var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
/* import { ProfilePage } from '../../pages/user/profile/profile'; */
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(nav) {
        this.nav = nav;
        this.search = "";
        this.showSearchBar = false;
    }
    HeaderComponent.prototype.goToProfile = function () {
        /*  this.nav.push(ProfilePage) */
    };
    HeaderComponent.prototype.btnSearch = function () {
        this.showSearchBar = !this.showSearchBar;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "title", void 0);
    HeaderComponent = __decorate([
        Component({
            selector: 'header',
            templateUrl: 'header.html'
        }),
        __metadata("design:paramtypes", [NavController])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.js.map