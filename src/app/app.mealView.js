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
var common_1 = require("@angular/common");
var app_globalData_1 = require("./app.globalData");
var MealViewComponent = (function () {
    function MealViewComponent(globalData, datepipe) {
        var _this = this;
        this.globalData = globalData;
        this.datepipe = datepipe;
        this.mealList = [];
        this.isUserAdmin = false;
        this.totalCalories = this.globalData.getTotalCalories(this.globalData.currentUser);
        this.showUpdateTotal = false;
        this.showModifyForm = false;
        this.showFilterForm = false;
        this.showSignupEvent = new core_1.EventEmitter();
        this.logout = function () {
            _this.globalData.currentUser = "";
            _this.showSignupEvent.emit('');
        };
        this.submitModifyForm = function () {
            _this.mdError = null;
            _this.calError = null;
            _this.timeError = null;
            if (_this.updMealDesc == null || _this.updMealDesc == "") {
                _this.mdError = "Please fill in your Meal Description";
                return;
            }
            if (_this.updCalories == null) {
                _this.calError = "Please fill in the Calories";
                return;
            }
            if (_this.updTime == null || _this.updTime == "") {
                _this.timeError = "Please fill in the Date and Time of your Meal";
                return;
            }
            if (_this.currentUpdateMeal != null) {
                _this.globalData.updateMeal(_this.currentUpdateMeal, _this.updMealDesc, _this.updCalories, new Date(_this.updTime));
                _this.submitFilterForm();
                _this.showModifyForm = false;
            }
            else {
                _this.globalData.addMeal(_this.globalData.currentUser, _this.updMealDesc, _this.updCalories, new Date(_this.updTime));
                _this.submitFilterForm();
                _this.showModifyForm = false;
            }
        };
        this.clearModifyForm = function () {
            _this.mdError = null;
            _this.calError = null;
            _this.timeError = null;
            _this.showModifyForm = false;
        };
        this.submitFilterForm = function () {
            _this.fdfError = null;
            _this.tdfError = null;
            _this.ftfError = null;
            _this.ttfError = null;
            if ((_this.filterFromDate == null || _this.filterFromDate == "") &&
                (_this.filterToDate != null && _this.filterToDate != "")) {
                _this.fdfError = "Both Date fields must be Set or left Un-set";
                return;
            }
            if ((_this.filterFromDate != null && _this.filterFromDate != "") &&
                (_this.filterToDate == null || _this.filterToDate == "")) {
                _this.tdfError = "Both Date fields must be Set or left Un-set";
                return;
            }
            if ((_this.filterFromTime == null || _this.filterFromTime == "") &&
                (_this.filterToTime != null && _this.filterToTime != "")) {
                _this.ftfError = "Both Time fields must be Set or left Un-set";
                return;
            }
            if ((_this.filterFromTime != null && _this.filterFromTime != "") &&
                (_this.filterToTime == null || _this.filterToTime == "")) {
                _this.ttfError = "Both Time fields must be Set or left Un-set";
                return;
            }
            if ((_this.filterFromDate == null || _this.filterFromDate == "") &&
                (_this.filterToDate == null || _this.filterToDate == "") &&
                (_this.filterFromTime == null || _this.filterFromTime == "") &&
                (_this.filterToTime == null || _this.filterToTime == "")) {
                _this.isFilteredView = false;
            }
            else {
                _this.isFilteredView = true;
            }
            var fdate = null;
            if (_this.filterFromDate != null && _this.filterFromDate != "")
                fdate = new Date(_this.filterFromDate + 'T00:00:00');
            var tdate = null;
            if (_this.filterToDate != null && _this.filterToDate != "")
                tdate = new Date(_this.filterToDate + 'T23:59:59');
            if (fdate && tdate && fdate > tdate) {
                _this.fdfError = "The From Date must be before the To Date";
                return;
            }
            var ftime = null;
            if (_this.filterFromTime != null && _this.filterFromTime != "")
                ftime = new Date('2000-01-01T' + _this.filterFromTime);
            var ttime = null;
            if (_this.filterToTime != null && _this.filterToTime != "")
                ttime = new Date('2000-01-01T' + _this.filterToTime);
            if (ftime && ttime && ftime > ttime) {
                _this.ftfError = "The From Time must be before the To Time";
                return;
            }
            _this.mealList = _this.globalData.getFilteredMeals(fdate, tdate, ftime, ttime);
            _this.calcDailyTotals();
            _this.showFilterForm = false;
        };
        this.clearFilter = function () {
            _this.filterFromDate = null;
            _this.filterToDate = null;
            _this.filterFromTime = null;
            _this.filterToTime = null;
            _this.mealList = _this.globalData.getMeals();
            _this.calcDailyTotals();
            _this.isFilteredView = false;
        };
        this.calcDailyTotals = function () {
            _this.totalCalories = _this.updateCalories;
            _this.globalData.setTotalCalories(_this.updateCalories);
            _this.showUpdateTotal = false;
            var dailyMap = new Map();
            for (var _i = 0, _a = _this.mealList; _i < _a.length; _i++) {
                var meal = _a[_i];
                var day = _this.getDailyMapKey(meal.userName, meal.time);
                var dayValue = dailyMap.get(day);
                if (dayValue == null) {
                    dayValue = 0;
                }
                dayValue += meal.calories;
                dailyMap.set(day, dayValue);
            }
            for (var _b = 0, _c = _this.mealList; _b < _c.length; _b++) {
                var meal = _c[_b];
                var dayValue = dailyMap.get(_this.getDailyMapKey(meal.userName, meal.time));
                meal.underDaily = (dayValue > _this.globalData.getTotalCalories(meal.userName));
            }
        };
        this.getDailyMapKey = function (userName, date) {
            return "" + userName + date.getMonth() + date.getDay() + date.getFullYear();
        };
        this.deleteMeal = function (row) {
            _this.globalData.deleteMeal(_this.mealList[row]);
            _this.submitFilterForm();
        };
        this.addMeal = function () {
            _this.modifyPanelTitle = "Add Meal Information";
            _this.currentUpdateMeal = null;
            _this.updMealDesc = null;
            _this.updCalories = null;
            _this.updTime = _this.datepipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
            _this.showModifyForm = true;
        };
        this.modifyMeal = function (row) {
            _this.modifyPanelTitle = "Update Meal Information";
            _this.currentUpdateMeal = _this.mealList[row];
            _this.updMealDesc = _this.currentUpdateMeal.description;
            _this.updCalories = _this.currentUpdateMeal.calories;
            _this.updTime = _this.datepipe.transform(_this.currentUpdateMeal.time, 'yyyy-MM-ddTHH:mm');
            _this.showModifyForm = true;
        };
        this.mealList = globalData.getMeals();
        this.isUserAdmin = globalData.isUserAdmin();
    }
    return MealViewComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MealViewComponent.prototype, "showSignupEvent", void 0);
MealViewComponent = __decorate([
    core_1.Component({
        selector: 'meal-view',
        template: "    \n  <div class=\"mealPanel\">\n  <div class=\"mealFrame\">\n    <div class=\"mealTitle\">Meal Tracker \n        <span *ngIf=\"isFilteredView\">(Filtered View)\n            <i class=\"fa fa-minus-circle\" (click)=\"clearFilter()\" title=\"Clear Filter\"></i>\n        </span>\n        <button class=\"logoutButton\" (click)=\"logout()\">Sign Out</button>\n    </div>\n    <div class=\"container-fluid\">\n        <div class=\"mealHeader row\">\n            <div *ngIf=\"isUserAdmin == true\" class=\"col-md-2\">User Name</div>\n            <div class=\"col-md-4\">Meal Description</div>\n            <div class=\"col-md-2\">Calories</div>\n            <div [ngClass]=\"{'col-md-5': isUserAdmin == false, 'col-md-3': isUserAdmin == true}\">Time</div>\n            <div class=\"col-md-1\">\n                <i class=\"fa fa-filter\" (click)=\"showFilterForm = true\" title=\"Filter Meals\"></i>\n                <i class=\"fa fa-plus\" (click)=\"addMeal()\" title=\"Add New Meal\"></i>\n            </div>\n        </div>\n        <div *ngIf=\"mealList?.length == 0\" class=\"mealRow row\">(No Meals to Show)</div>\n        <div *ngIf=\"mealList?.length > 0\">\n            <div *ngFor=\"let meal of mealList; let i = index\" class=\"mealRow row\">\n                <div *ngIf=\"isUserAdmin == true\" class=\"col-md-2\">{{meal.userName}}</div>\n                <div class=\"col-md-4\">{{meal.description}}</div>\n                <div class=\"col-md-2\" [ngClass]=\"{'calorieOK': !meal.underDaily, 'calorieNotOK': meal.underDaily}\">{{meal.calories}}</div>\n                <div [ngClass]=\"{'col-md-5': isUserAdmin == false, 'col-md-3': isUserAdmin == true}\">\n                    {{meal.time | date:'h:mm a, MMMM d, yyyy'}}</div>\n                <div class=\"col-md-1\">\n                    <i class=\"fa fa-pencil\" (click)=\"modifyMeal(i)\" title=\"Update Meal Information\"></i>\n                    <i class=\"fa fa-trash-o removeMeal\" (click)=\"deleteMeal(i)\" title=\"Remove Meal\"></i>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n  </div>\n  <div class=\"mealPanel row\">\n    <div class=\"totalFrame row\">\n        <div *ngIf=\"!showUpdateTotal\" class=\"col-md-6 totalCell\">\n            Calories Allowed per Day: {{totalCalories}}\n                <i class=\"fa fa-pencil updateCalories\" \n                (click)=\"updateCalories = totalCalories; showUpdateTotal = true\" title=\"Change Calories\"></i>\n        </div>\n        <div *ngIf=\"showUpdateTotal\" class=\"col-md-6 totalCell\">\n            Calories Allowed per Day: \n                <input type=\"number\" [(ngModel)]=\"updateCalories\" (keyup.enter)=\"calcDailyTotals()\" autofocus/>\n                <i class=\"fa fa-trash-o confirmCalories confirmCaloriesIcon\" \n                (click)=\"showUpdateTotal = false\" title=\"Cancel Change\"></i>\n                <i class=\"fa fa-check confirmCalories\" \n                (click)=\"calcDailyTotals()\" title=\"Confirm Change\"></i>\n        </div>\n    </div>\n  </div>\n  <div *ngIf=\"showModifyForm\" class=\"modifyPanel\">\n    <div class=\"modifyFrame\">\n        <div class=\"modifyTitle\">{{modifyPanelTitle}}</div>\n        <div class=\"logWords\">Meal Description <span>{{mdError}}</span></div>\n        <div class=\"logWords\"><input type=\"text\" [(ngModel)]=\"updMealDesc\" (keyup.enter)=\"submitModifyForm()\"/></div>\n        <div class=\"logWords\">Calories <span>{{calError}}</span></div>\n        <div class=\"logWords\"><input type=\"number\" [(ngModel)]=\"updCalories\" (keyup.enter)=\"submitModifyForm()\" /></div>\n        <div class=\"logWords\">Date and Time <span>{{timeError}}</span></div>\n        <div class=\"logWords\"><input type=\"datetime-local\" [(ngModel)]=\"updTime\" (keyup.enter)=\"submitModifyForm()\" /></div>\n        <div class=\"logWords\">\n            <button class=\"goButton\" (click)=\"submitModifyForm()\">Submit</button>\n            <button class=\"backButton\" (click)=\"clearModifyForm()\">Cancel</button>\n        </div>\n    </div>\n  </div>\n  <div *ngIf=\"showFilterForm\" class=\"filterPanel\">\n    <div class=\"filterFrame\">\n        <div class=\"modifyTitle\">Enter Filter</div>\n        <div class=\"logWords\">From Date <span>{{fdfError}}</span></div>\n        <div class=\"logWords\"><input type=\"date\" [(ngModel)]=\"filterFromDate\" (keyup.enter)=\"submitFilterForm()\"/></div>\n        <div class=\"logWords\">To Date <span>{{tdfError}}</span></div>\n        <div class=\"logWords\"><input type=\"date\" [(ngModel)]=\"filterToDate\" (keyup.enter)=\"submitFilterForm()\" /></div>\n        <div class=\"logWords\">From Time <span>{{ftfError}}</span></div>\n        <div class=\"logWords\"><input type=\"time\" [(ngModel)]=\"filterFromTime\" (keyup.enter)=\"submitFilterForm()\" /></div>\n        <div class=\"logWords\">To Time <span>{{ttfError}}</span></div>\n        <div class=\"logWords\"><input type=\"time\" [(ngModel)]=\"filterToTime\" (keyup.enter)=\"submitFilterForm()\" /></div>\n        <div class=\"logWords\">\n            <button class=\"goButton\" (click)=\"submitFilterForm()\">Submit</button>\n            <button class=\"backButton\" (click)=\"showFilterForm = false\">Cancel</button>\n        </div>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [app_globalData_1.GlobalDataService, common_1.DatePipe])
], MealViewComponent);
exports.MealViewComponent = MealViewComponent;
//# sourceMappingURL=app.mealView.js.map