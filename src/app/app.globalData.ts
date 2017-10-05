import { Injectable } from '@angular/core';

@Injectable()
export class GlobalDataService  
{ 
    constructor() {
        this.userMap.set("user1", {pw: "user1", totalCalories: null});
        this.userMap.set("user2", {pw: "user2", totalCalories: null});
        this.addMeal("user1", "Fried Chicken", 800, new Date("2017-10-02T18:00:00"));
        this.addMeal("user1", "Steak", 700, new Date("2017-10-01T19:00:00"));
        this.addMeal("user1", "Pancakes with Syrup", 900, new Date("2017-10-02T08:00:00"));
        this.addMeal("user2", "Steak", 700, new Date("2017-10-01T18:00:00"));
        this.addMeal("user2", "Fish and Chips", 1000, new Date("2017-10-02T19:00:00"));
    }
    
    currentUser: string = "";
    
    userMap: Map<string, {pw: string, totalCalories: number}> = new Map<string, {pw: string, totalCalories: number}>();
    
    adminUsers = ["user1"];
    
    mealMap: Map<string, any> = new Map<string, any>();
    
    getTotalCalories = (user: string) => {
        return this.userMap.get(user).totalCalories;
    }
    
    setTotalCalories = (calories: number) => {
        if (this.currentUser) {
            let userObj = this.userMap.get(this.currentUser);
            
            if (userObj) {
                userObj.totalCalories = calories;
            }
        }
    }
    
    addMeal = (userName: string, description: string, calories: number, time: Date) => {
        let mealArray = this.mealMap.get(userName);
        
        if (mealArray == null) {
            this.mealMap.set(userName, []);
            mealArray = this.mealMap.get(userName);
        }
        
        mealArray.push({userName: userName, description: description, calories: calories, time: time});
    }
    
    updateMeal = (mealObj: any, description: string, calories: number, time: Date) => {
        let mealList = this.mealMap.get(mealObj.userName);
 
        if (mealList != null && mealList.indexOf(mealObj) >= 0) {
            let meal = mealList[mealList.indexOf(mealObj)];
            meal.description = description;
            meal.calories = calories;
            meal.time = time;
        }
    }
    
    deleteMeal = (mealObj: any) => {
        let mealList = this.mealMap.get(mealObj.userName);
        
        if (mealList != null) {
            mealList.splice(mealList.indexOf(mealObj), 1);
        }
    }
    
    isUserAdmin = () => {
        return (this.adminUsers.indexOf(this.currentUser) > -1);
    }
    
    getMeals = () => {
        if (this.adminUsers.indexOf(this.currentUser) > -1) {
            let allMeals: Array<any> = [];
            this.mealMap.forEach((value, key: string) => {
                allMeals = allMeals.concat(value);
            });
            
            return allMeals;
        }
        else {
            let meals = this.mealMap.get(this.currentUser);
            if (meals == null) { meals = []; }
            return meals;
        }
    }
    
    getFilteredMeals = (fromDate: Date, toDate: Date, fromTime: Date, toTime: Date) => {
        let filteredMeals = [];
        let allMeals = this.getMeals();
        
        for (let meal of allMeals) {
            if ((fromDate == null || (fromDate <= meal.time && toDate >= meal.time)) &&
                (fromTime == null || 
                    (fromTime.getHours() < meal.time.getHours() && toTime.getHours() > meal.time.getHours()) ||
                    ((fromTime.getHours() == meal.time.getHours() && fromTime.getMinutes() <= meal.time.getMinutes()) ||
                     (toTime.getHours() == meal.time.getHours() && toTime.getMinutes() >= meal.time.getMinutes())))) {
                filteredMeals.push(meal);
            }
        }
        
        return filteredMeals;
    }
}
