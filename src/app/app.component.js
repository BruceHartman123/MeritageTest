"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.showNewUser = false;
        this.showSignup = true;
        this.showMealView = false;
        this.hideAll = function () {
            _this.showNewUser = false;
            _this.showSignup = false;
            _this.showMealView = false;
        };
        this.setShowNewUser = function () {
            _this.hideAll();
            _this.showNewUser = true;
        };
        this.setShowSignup = function () {
            _this.hideAll();
            _this.showSignup = true;
        };
        this.setShowMealView = function () {
            _this.hideAll();
            _this.showMealView = true;
        };
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'mt-app',
        template: "    \n  <div *ngIf=\"showSignup\" >\n    <mt-signup (showNewUserEvent)=\"setShowNewUser()\" (showMealViewEvent) = \"setShowMealView()\" ></mt-signup>\n  </div>\n  <div *ngIf=\"showNewUser\">\n    <mt-newuser (showSignupEvent)=\"setShowSignup()\" (showMealViewEvent) = \"setShowMealView()\" ></mt-newuser>\n  </div>\n  <div *ngIf=\"showMealView\"><meal-view (showSignupEvent)=\"setShowSignup()\" ></meal-view></div>\n  "
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map