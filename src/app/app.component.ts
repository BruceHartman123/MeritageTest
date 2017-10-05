import { Component } from '@angular/core';

import { NewUserComponent } from './app.newUser';
import { SignupComponent } from './app.signup';
import { MealViewComponent } from './app.mealView';

@Component({
  selector: 'mt-app',
  template: `    
  <div *ngIf="showSignup" >
    <mt-signup (showNewUserEvent)="setShowNewUser()" (showMealViewEvent) = "setShowMealView()" ></mt-signup>
  </div>
  <div *ngIf="showNewUser">
    <mt-newuser (showSignupEvent)="setShowSignup()" (showMealViewEvent) = "setShowMealView()" ></mt-newuser>
  </div>
  <div *ngIf="showMealView"><meal-view (showSignupEvent)="setShowSignup()" ></meal-view></div>
  `
})
export class AppComponent  
{ 
    showNewUser: boolean = false;
    showSignup: boolean = true;
    showMealView = false;
    
    public hideAll = () => {
        this.showNewUser = false;
        this.showSignup = false;
        this.showMealView = false;
    }
    
    public setShowNewUser = () => {
        this.hideAll();
        this.showNewUser = true;
    }
    
    public setShowSignup = () => {
        this.hideAll();
        this.showSignup = true;
    }
    
    public setShowMealView = () => {
        this.hideAll();
        this.showMealView = true;
    }
}
