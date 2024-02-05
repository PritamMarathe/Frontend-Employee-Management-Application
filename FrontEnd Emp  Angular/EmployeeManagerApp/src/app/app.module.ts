import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  // Importing Related features
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [EmployeeService], //Extend Injecteble ProdivedIn EmployeeService Class
  bootstrap: [AppComponent]
})
export class AppModule { }
