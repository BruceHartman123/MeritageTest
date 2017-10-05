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
var GlobalDataService = (function () {
    function GlobalDataService() {
        var _this = this;
        this.currentUser = "";
        this.userMap = new Map();
        this.adminUsers = ["user1"];
        this.mealMap = new Map();
        this.getTotalCalories = function (user) {
            return _this.userMap.get(user).totalCalories;
        };
        this.setTotalCalories = function (calories) {
            if (_this.currentUser) {
                var userObj = _this.userMap.get(_this.currentUser);
                if (userObj) {
                    userObj.totalCalories = calories;
                }
            }
        };
        this.addMeal = function (userName, description, calories, time) {
            var mealArray = _this.mealMap.get(userName);
            if (mealArray == null) {
                _this.mealMap.set(userName, []);
                mealArray = _this.mealMap.get(userName);
            }
            mealArray.push({ userName: userName, description: description, calories: calories, time: time });
        };
        this.updateMeal = function (mealObj, description, calories, time) {
            var mealList = _this.mealMap.get(mealObj.userName);
            if (mealList != null && mealList.indexOf(mealObj) >= 0) {
                var meal = mealList[mealList.indexOf(mealObj)];
                meal.description = description;
                meal.calories = calories;
                meal.time = time;
            }
        };
        this.deleteMeal = function (mealObj) {
            var mealList = _this.mealMap.get(mealObj.userName);
            if (mealList != null) {
                mealList.splice(mealList.indexOf(mealObj), 1);
            }
        };
        this.isUserAdmin = function () {
            return (_this.adminUsers.indexOf(_this.currentUser) > -1);
        };
        this.getMeals = function () {
            if (_this.adminUsers.indexOf(_this.currentUser) > -1) {
                var allMeals_1 = [];
                _this.mealMap.forEach(function (value, key) {
                    allMeals_1 = allMeals_1.concat(value);
                });
                return allMeals_1;
            }
            else {
                var meals = _this.mealMap.get(_this.currentUser);
                if (meals == null) {
                    meals = [];
                }
                return meals;
            }
        };
        this.getFilteredMeals = function (fromDate, toDate, fromTime, toTime) {
            var filteredMeals = [];
            var allMeals = _this.getMeals();
            for (var _i = 0, allMeals_2 = allMeals; _i < allMeals_2.length; _i++) {
                var meal = allMeals_2[_i];
                if ((fromDate == null || (fromDate <= meal.time && toDate >= meal.time)) &&
                    (fromTime == null ||
                        (fromTime.getHours() < meal.time.getHours() && toTime.getHours() > meal.time.getHours()) ||
                        ((fromTime.getHours() == meal.time.getHours() && fromTime.getMinutes() <= meal.time.getMinutes()) ||
                            (toTime.getHours() == meal.time.getHours() && toTime.getMinutes() >= meal.time.getMinutes())))) {
                    filteredMeals.push(meal);
                }
            }
            return filteredMeals;
        };
        this.userMap.set("user1", { pw: "user1", totalCalories: null });
        this.userMap.set("user2", { pw: "user2", totalCalories: null });
        this.addMeal("user1", "Fried Chicken", 800, new Date("2017-10-02T18:00:00"));
        this.addMeal("user1", "Steak", 700, new Date("2017-10-01T19:00:00"));
        this.addMeal("user1", "Pancakes with Syrup", 900, new Date("2017-10-02T08:00:00"));
        this.addMeal("user2", "Steak", 700, new Date("2017-10-01T18:00:00"));
        this.addMeal("user2", "Fish and Chips", 1000, new Date("2017-10-02T19:00:00"));
    }
    return GlobalDataService;
}());
GlobalDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], GlobalDataService);
exports.GlobalDataService = GlobalDataService;
//# sourceMappingURL=app.globalData.js.map