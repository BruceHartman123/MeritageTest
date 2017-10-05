"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var app_globalData_1 = require("./app.globalData");
var SignupComponent = (function () {
    function SignupComponent(globalData) {
        var _this = this;
        this.globalData = globalData;
        this.userName = '';
        this.password = '';
        this.unError = "";
        this.pwError = "";
        this.showNewUserEvent = new core_1.EventEmitter();
        this.showMealViewEvent = new core_1.EventEmitter();
        this.newUser = function () {
            _this.showNewUserEvent.emit('');
        };
        this.submitForm = function () {
            _this.unError = "";
            _this.pwError = "";
            if (_this.userName == "") {
                _this.unError = "(Please enter a valid User Name!)";
                return;
            }
            if (_this.password == "") {
                _this.pwError = "(Please enter a valid Password!)";
                return;
            }
            var userObj = _this.globalData.userMap.get(_this.userName);
            if ((userObj == null) || (userObj.pw != _this.password)) {
                _this.unError = "(Invalid User Name or Password!)";
                return;
            }
            _this.globalData.currentUser = _this.userName;
            _this.showMealViewEvent.emit('');
        };
    }
    return SignupComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SignupComponent.prototype, "showNewUserEvent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SignupComponent.prototype, "showMealViewEvent", void 0);
SignupComponent = __decorate([
    core_1.Component({
        selector: 'mt-signup',
        template: "    \n  <div class=\"logPanel\">\n  <div class=\"logFrame\">\n    <div class=\"logTitle\">Sign In</div>\n    <div class=\"logWords\">User Name <span>{{unError}}</span></div>\n    <div class=\"logWords\"><input type=\"text\" [(ngModel)]=\"userName\" (keyup.enter)=\"submitForm()\" autofocus /></div>\n    <div class=\"logWords\">Password <span>{{pwError}}</span></div>\n    <div class=\"logWords\"><input type=\"password\" [(ngModel)]=\"password\" (keyup.enter)=\"submitForm()\" /></div>\n    <div class=\"logWords\"><button class=\"goButton\" (click)=\"submitForm()\">Sign In</button></div>\n    <div class=\"logWords link\" (click)=\"newUser()\">New User?</div>\n  </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [app_globalData_1.GlobalDataService])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=app.signup.js.map