import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GlobalDataService } from './app.globalData';

@Component({
  selector: 'mt-newuser',
  template: `    
  <div class="logPanel">
  <div class="logFrame">
    <div class="logTitle">New User</div>
    <div class="logWords">New User Name <span>{{unError}}</span></div>
    <div class="logWords"><input type="text" [(ngModel)]="userName" (keyup.enter)="submitForm()" autofocus /></div>
    <div class="logWords">New Password <span>{{pwError}}</span></div>
    <div class="logWords"><input type="password" [(ngModel)]="password" (keyup.enter)="submitForm()"/></div>
    <div class="logWords">Verify Password <span>{{spError}}</span></div>
    <div class="logWords"><input type="password" [(ngModel)]="secondPassword" (keyup.enter)="submitForm()"/></div>
    <div class="logWords">
        <button class="goButton" (click)="submitForm()">Submit</button>
        <button class="backButton" (click)="cancelForm()">Cancel</button>
    </div>
  </div>
  </div>
  `
})
export class NewUserComponent  
{ 
    constructor(private globalData: GlobalDataService) { }
    
    userName = '';
    password = '';
    secondPassword = '';
    unError = "";
    pwError = "";
    spError = "";
    @Output() showSignupEvent = new EventEmitter();
    @Output() showMealViewEvent = new EventEmitter();
    
    cancelForm = () => {
        this.showSignupEvent.emit('');
    }
    
    submitForm = () => {
        this.unError = "";
        this.pwError = "";
        this.spError = "";
        
        if (this.userName == "") {
            this.unError = "(Please enter a valid User Name!)";
            return;
        }
        
        if (this.password == "") {
            this.pwError = "(Please enter a valid Password!)";
            return;
        }
        
        if (this.password != this.secondPassword) {
            this.spError = "(The Passwords do not match!)"
            return;
        }
        
        let pwInList = this.globalData.userMap.get(this.userName);
        if (pwInList != null) {
            this.unError = "(This User Name is being used.)"
            return;
        }

        this.globalData.userMap.set(this.userName, {pw: this.password, totalCalories: null});
        this.globalData.currentUser = this.userName;
        this.showMealViewEvent.emit('');
    }
}
