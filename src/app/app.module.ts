import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent }  from './app.component';
import { NewUserComponent } from './app.newUser';
import { SignupComponent } from './app.signup';
import { GlobalDataService } from './app.globalData';
import { MealViewComponent } from './app.mealView';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, NewUserComponent, SignupComponent, MealViewComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ GlobalDataService, DatePipe ]
})
export class AppModule { }
