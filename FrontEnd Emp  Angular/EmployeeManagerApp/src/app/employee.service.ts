import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

// Injectable:- Decorator that marks a class as available 
// to be provided and injected as a dependency.
@Injectable({providedIn: 'root'})
export class EmployeeService {
// Define the URL path    Importing Envirment file
  private apiServerUrl = environment.apiBaseUrl;//calling from the  Envirment 

  constructor(private http: HttpClient){}


// Observable:-A representation of any set of values over any amount of time. 
// This is the most basic building block of RxJS.

  // getEmployee:for get the all data on server
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  // ` ` :It's backtic
// addEmployee:For add data on server
  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  // updateEmployee:For update data on server
  // public updateEmployee(employee: Employee): Observable<Employee> {
  //   return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  // }

  updateEmployee(employee:Employee):Observable<Employee>{
    return this.http.put<Employee>("http://localhost:8080/update"+"/"+employee.id,employee);
  }



  // deleteEmployee:-For Delete data on server
  // void:-we are not send date when delete so that's reason used void
  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}
