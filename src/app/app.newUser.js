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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_globalData_1 = require("./app.globalData");
var NewUserComponent = (function () {
    function NewUserComponent(globalData) {
        var _this = this;
        this.globalData = globalData;
        this.userName = '';
        this.password = '';
        this.secondPassword = '';
        this.unError = "";
        this.pwError = "";
        this.spError = "";
        this.showSignupEvent = new core_1.EventEmitter();
        this.showMealViewEvent = new core_1.EventEmitter();
        this.cancelForm = function () {
            _this.showSignupEvent.emit('');
        };
        this.submitForm = function () {
            _this.unError = "";
            _this.pwError = "";
            _this.spError = "";
            if (_this.userName == "") {
                _this.unError = "(Please enter a valid User Name!)";
                return;
            }
            if (_this.password == "") {
                _this.pwError = "(Please enter a valid Password!)";
                return;
            }
            if (_this.password != _this.secondPassword) {
                _this.spError = "(The Passwords do not match!)";
                return;
            }
            var pwInList = _this.globalData.userMap.get(_this.userName);
            if (pwInList != null) {
                _this.unError = "(This User Name is being used.)";
                return;
            }
            _this.globalData.userMap.set(_this.userName, { pw: _this.password, totalCalories: null });
            _this.globalData.currentUser = _this.userName;
            _this.showMealViewEvent.emit('');
        };
    }
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NewUserComponent.prototype, "showSignupEvent", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NewUserComponent.prototype, "showMealViewEvent", void 0);
    NewUserComponent = __decorate([
        core_1.Component({
            selector: 'mt-newuser',
            template: "    \n  <div class=\"logPanel\">\n  <div class=\"logFrame\">\n    <div class=\"logTitle\">New User</div>\n    <div class=\"logWords\">New User Name <span>{{unError}}</span></div>\n    <div class=\"logWords\"><input type=\"text\" [(ngModel)]=\"userName\" (keyup.enter)=\"submitForm()\" autofocus /></div>\n    <div class=\"logWords\">New Password <span>{{pwError}}</span></div>\n    <div class=\"logWords\"><input type=\"password\" [(ngModel)]=\"password\" (keyup.enter)=\"submitForm()\"/></div>\n    <div class=\"logWords\">Verify Password <span>{{spError}}</span></div>\n    <div class=\"logWords\"><input type=\"password\" [(ngModel)]=\"secondPassword\" (keyup.enter)=\"submitForm()\"/></div>\n    <div class=\"logWords\">\n        <button class=\"goButton\" (click)=\"submitForm()\">Submit</button>\n        <button class=\"backButton\" (click)=\"cancelForm()\">Cancel</button>\n    </div>\n  </div>\n  </div>\n  "
        }),
        __metadata("design:paramtypes", [app_globalData_1.GlobalDataService])
    ], NewUserComponent);
    return NewUserComponent;
}());
exports.NewUserComponent = NewUserComponent;
//# sourceMappingURL=app.newUser.js.map