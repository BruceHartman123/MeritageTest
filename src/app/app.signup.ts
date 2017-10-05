import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GlobalDataService } from './app.globalData';

@Component({
  selector: 'mt-signup',
  template: `    
  <div class="logPanel">
  <div class="logFrame">
    <div class="logTitle">Sign In</div>
    <div class="logWords">User Name <span>{{unError}}</span></div>
    <div class="logWords"><input type="text" [(ngModel)]="userName" (keyup.enter)="submitForm()" autofocus /></div>
    <div class="logWords">Password <span>{{pwError}}</span></div>
    <div class="logWords"><input type="password" [(ngModel)]="password" (keyup.enter)="submitForm()" /></div>
    <div class="logWords"><button class="goButton" (click)="submitForm()">Sign In</button></div>
    <div class="logWords link" (click)="newUser()">New User?</div>
  </div>
  </div>
  `
})
export class SignupComponent  
{ 
    constructor(private globalData: GlobalDataService) { }
    
    userName = '';
    password = '';
    unError = "";
    pwError = "";
    @Output() showNewUserEvent = new EventEmitter();
    @Output() showMealViewEvent = new EventEmitter();
    
    newUser = () => {
        this.showNewUserEvent.emit('');
    }
    
    submitForm = () => {
        this.unError = "";
        this.pwError = "";
        
        if (this.userName == "") {
            this.unError = "(Please enter a valid User Name!)";
            return;
        }
        
        if (this.password == "") {
            this.pwError = "(Please enter a valid Password!)";
            return;
        }
        
        let userObj = this.globalData.userMap.get(this.userName);
        if ((userObj == null) || (userObj.pw != this.password)) {
            this.unError = "(Invalid User Name or Password!)"
            return;
        }
        
        this.globalData.currentUser = this.userName;
        
        this.showMealViewEvent.emit('');
    }
}
