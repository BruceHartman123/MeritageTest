import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { GlobalDataService } from './app.globalData';

@Component({
  selector: 'meal-view',
  template: `    
  <div class="mealPanel">
  <div class="mealFrame">
    <div class="mealTitle">Meal Tracker 
        <span *ngIf="isFilteredView">(Filtered View)
            <i class="fa fa-minus-circle" (click)="clearFilter()" title="Clear Filter"></i>
        </span>
        <button class="logoutButton" (click)="logout()">Sign Out</button>
    </div>
    <div class="container-fluid">
        <div class="mealHeader row">
            <div *ngIf="isUserAdmin == true" class="col-md-2">User Name</div>
            <div class="col-md-4">Meal Description</div>
            <div class="col-md-2">Calories</div>
            <div [ngClass]="{'col-md-5': isUserAdmin == false, 'col-md-3': isUserAdmin == true}">Time</div>
            <div class="col-md-1">
                <i class="fa fa-filter" (click)="showFilterForm = true" title="Filter Meals"></i>
                <i *ngIf="isUserAdmin == false" class="fa fa-plus" (click)="addMeal()" title="Add New Meal"></i>
            </div>
        </div>
        <div *ngIf="mealList?.length == 0" class="mealRow row">(No Meals to Show)</div>
        <div *ngIf="mealList?.length > 0">
            <div *ngFor="let meal of mealList; let i = index" class="mealRow row">
                <div *ngIf="isUserAdmin == true" class="col-md-2">{{meal.userName}}</div>
                <div class="col-md-4">{{meal.description}}</div>
                <div class="col-md-2" [ngClass]="{'calorieOK': !meal.underDaily || isUserAdmin, 'calorieNotOK': meal.underDaily && !isUserAdmin}">{{meal.calories}}</div>
                <div [ngClass]="{'col-md-5': isUserAdmin == false, 'col-md-3': isUserAdmin == true}">
                    {{meal.time | date:'h:mm a, MMMM d, yyyy'}}</div>
                <div class="col-md-1">
                    <i class="fa fa-pencil" (click)="modifyMeal(i)" title="Update Meal Information"></i>
                    <i class="fa fa-trash-o removeMeal" (click)="deleteMeal(i)" title="Remove Meal"></i>
                </div>
            </div>
        </div>
    </div>
  </div>
  </div>
  <div *ngIf="isUserAdmin == false" class="mealPanel row">
    <div class="totalFrame row">
        <div *ngIf="!showUpdateTotal" class="col-md-6 totalCell">
            Calories Allowed per Day: {{totalCalories}}
                <i class="fa fa-pencil updateCalories" 
                (click)="updateCalories = totalCalories; showUpdateTotal = true" title="Change Calories"></i>
        </div>
        <div *ngIf="showUpdateTotal" class="col-md-6 totalCell">
            Calories Allowed per Day: 
                <input type="number" [(ngModel)]="updateCalories" (keyup.enter)="calcDailyTotals()" autofocus/>
                <i class="fa fa-trash-o confirmCalories confirmCaloriesIcon" 
                (click)="showUpdateTotal = false" title="Cancel Change"></i>
                <i class="fa fa-check confirmCalories" 
                (click)="calcDailyTotals()" title="Confirm Change"></i>
        </div>
    </div>
  </div>
  <div *ngIf="showModifyForm" class="modifyPanel">
    <div class="modifyFrame">
        <div class="modifyTitle">{{modifyPanelTitle}}</div>
        <div class="logWords">Meal Description <span>{{mdError}}</span></div>
        <div class="logWords"><input type="text" [(ngModel)]="updMealDesc" (keyup.enter)="submitModifyForm()"/></div>
        <div class="logWords">Calories <span>{{calError}}</span></div>
        <div class="logWords"><input type="number" [(ngModel)]="updCalories" (keyup.enter)="submitModifyForm()" /></div>
        <div class="logWords">Date and Time <span>{{timeError}}</span></div>
        <div class="logWords"><input type="datetime-local" [(ngModel)]="updTime" (keyup.enter)="submitModifyForm()" /></div>
        <div class="logWords">
            <button class="goButton" (click)="submitModifyForm()">Submit</button>
            <button class="backButton" (click)="clearModifyForm()">Cancel</button>
        </div>
    </div>
  </div>
  <div *ngIf="showFilterForm" class="filterPanel">
    <div class="filterFrame">
        <div class="modifyTitle">Enter Filter</div>
        <div class="logWords">From Date <span>{{fdfError}}</span></div>
        <div class="logWords"><input type="date" [(ngModel)]="filterFromDate" (keyup.enter)="submitFilterForm()"/></div>
        <div class="logWords">To Date <span>{{tdfError}}</span></div>
        <div class="logWords"><input type="date" [(ngModel)]="filterToDate" (keyup.enter)="submitFilterForm()" /></div>
        <div class="logWords">From Time <span>{{ftfError}}</span></div>
        <div class="logWords"><input type="time" [(ngModel)]="filterFromTime" (keyup.enter)="submitFilterForm()" /></div>
        <div class="logWords">To Time <span>{{ttfError}}</span></div>
        <div class="logWords"><input type="time" [(ngModel)]="filterToTime" (keyup.enter)="submitFilterForm()" /></div>
        <div class="logWords">
            <button class="goButton" (click)="submitFilterForm()">Submit</button>
            <button class="backButton" (click)="showFilterForm = false">Cancel</button>
        </div>
    </div>
  </div>
  `
})
export class MealViewComponent  
{
    mealList = [];
    isUserAdmin = false;
    totalCalories = this.globalData.getTotalCalories();
    updateCalories;
    modifyPanelTitle;
    
    showUpdateTotal = false;
    showModifyForm = false;
    showFilterForm = false;
    
    updMealDesc;
    mdError;
    updCalories;
    calError;
    updTime;
    timeError;
    
    filterFromDate;
    fdfError;
    filterToDate;
    tdfError;
    filterFromTime;
    ftfError;
    filterToTime;
    ttfError;
    isFilteredView;
    
    currentUpdateMeal;
    
    constructor(private globalData: GlobalDataService, private datepipe: DatePipe) { 
        this.mealList = globalData.getMeals();
        this.isUserAdmin = globalData.isUserAdmin();
    }
    
    @Output() showSignupEvent = new EventEmitter();
    
    logout = () => {
        this.globalData.currentUser = "";
        this.showSignupEvent.emit('');
    }
    
    submitModifyForm = () => {
        this.mdError = null;
        this.calError = null;
        this.timeError = null;

        if (this.updMealDesc == null || this.updMealDesc == "") {
            this.mdError = "Please fill in your Meal Description";
            return;
        }
        
        if (this.updCalories == null || this.updCalories == "") {
            this.calError = "Please fill in the Calories";
            return;
        }
        
        if (this.updTime == null || this.updTime == "") {
            this.timeError = "Please fill in the Date and Time of your Meal";
            return;
        }
        
        if (this.currentUpdateMeal != null) {
            this.globalData.updateMeal(this.currentUpdateMeal, this.updMealDesc, this.updCalories, new Date(this.updTime));
            this.submitFilterForm();
            this.showModifyForm = false;
        }
        else {
            this.globalData.addMeal(this.globalData.currentUser, this.updMealDesc, this.updCalories, new Date(this.updTime), false);
            this.submitFilterForm();
            this.showModifyForm = false;
        }
    }
    
    clearModifyForm = () => {
        this.mdError = null;
        this.calError = null;
        this.timeError = null;
        this.showModifyForm = false;
    }
    
    submitFilterForm = () => {
        this.fdfError = null;
        this.tdfError = null;
        this.ftfError = null;
        this.ttfError = null;

        if ((this.filterFromDate == null || this.filterFromDate == "") && 
            (this.filterToDate != null && this.filterToDate != "")) {
            this.fdfError = "Both Date fields must be Set or left Un-set";
            return;
        }
        
        if ((this.filterFromDate != null && this.filterFromDate != "") &&
            (this.filterToDate == null || this.filterToDate == "")) {
            this.tdfError = "Both Date fields must be Set or left Un-set";
            return;
        }
        
        if ((this.filterFromTime == null || this.filterFromTime == "") && 
            (this.filterToTime != null && this.filterToTime != "")) {
            this.ftfError = "Both Time fields must be Set or left Un-set";
            return;
        }
        
        if ((this.filterFromTime != null && this.filterFromTime != "") && 
            (this.filterToTime == null || this.filterToTime == "")) {
            this.ttfError = "Both Time fields must be Set or left Un-set";
            return;
        }
        
        if ((this.filterFromDate == null || this.filterFromDate == "") && 
            (this.filterToDate == null || this.filterToDate == "") &&
            (this.filterFromTime == null || this.filterFromTime == "") &&
            (this.filterToTime == null || this.filterToTime == "")) {
            this.isFilteredView = false;
        }
        else { this.isFilteredView = true; }
            
        let fdate = null;
        if (this.filterFromDate != null && this.filterFromDate != "") 
            fdate = new Date(this.filterFromDate + 'T00:00:00');
        
        let tdate = null;
        if (this.filterToDate != null && this.filterToDate != "") 
            tdate = new Date(this.filterToDate + 'T23:59:59');
            
        if (fdate && tdate && fdate > tdate) {
            this.fdfError = "The From Date must be before the To Date";
            return;
        }
        
        let ftime = null;
        if (this.filterFromTime != null && this.filterFromTime != "") 
            ftime = new Date('2000-01-01T' + this.filterFromTime);
        
        let ttime = null;
        if (this.filterToTime != null && this.filterToTime != "") 
            ttime = new Date('2000-01-01T' + this.filterToTime);
       
        if (ftime && ttime && ftime > ttime) {
            this.ftfError = "The From Time must be before the To Time";
            return;
        }
        
        this.mealList = this.globalData.getFilteredMeals(fdate, tdate, ftime, ttime);
            
        this.calcDailyTotals();
        this.showFilterForm = false;
    }
    
    clearFilter = () => {
        this.filterFromDate = null;
        this.filterToDate = null;
        this.filterFromTime = null;
        this.filterToTime = null;
        this.mealList = this.globalData.getMeals();
        this.calcDailyTotals();
        this.isFilteredView = false;
    }
    
    calcDailyTotals = () => {
        this.totalCalories = this.updateCalories;
        this.globalData.setTotalCalories(this.updateCalories);
        this.showUpdateTotal = false; 
        
        let dailyMap: Map<string, float> = new Map<string, float>();
        
        for (let meal of this.mealList) {
            let day = this.getDailyMapKey(meal.time);
            let dayValue = dailyMap.get(day);
            
            if (dayValue == null) {
                dayValue = 0;
            }
            
            dayValue += meal.calories;
            dailyMap.set(day, dayValue);
        }
        
        for (let meal of this.mealList) {
            let dayValue = dailyMap.get(this.getDailyMapKey(meal.time));
            
            meal.underDaily = (dayValue > this.totalCalories);
        }
    }
    
    getDailyMapKey = (date: Date) => {
        return "" + date.getMonth() + date.getDay() + date.getYear();
    }
    
    deleteMeal = (row: integer) => {
        this.globalData.deleteMeal(this.mealList[row]);
        this.submitFilterForm();
    }
    
    addMeal = () => {
        this.modifyPanelTitle = "Add Meal Information";
        this.currentUpdateMeal = null;
        this.updMealDesc = null;
        this.updCalories = null;
        this.updTime = this.datepipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
        this.showModifyForm = true;
    }
    
    modifyMeal = (row: integer) => {
        this.modifyPanelTitle = "Update Meal Information";
        this.currentUpdateMeal = this.mealList[row];
        this.updMealDesc = this.currentUpdateMeal.description;
        this.updCalories = this.currentUpdateMeal.calories;
        this.updTime = this.datepipe.transform(this.currentUpdateMeal.time, 'yyyy-MM-ddTHH:mm');
        this.showModifyForm = true;
    }
}
