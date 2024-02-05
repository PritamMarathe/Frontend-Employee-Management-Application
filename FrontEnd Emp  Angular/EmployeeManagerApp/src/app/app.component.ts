import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Onit:it's Interface use for the connecting method like (get,add,deleteEmployees) from HTML class.
export class AppComponent implements OnInit {
  step: number;
  loan_step: boolean;
  LoanDetails: any;
  sdc: any;
  regform: any;
  r: any;

  title(title: any) {
    throw new Error('Method not implemented.');
  }
   
  public employees: Employee[]; //those Employee ress for the backend
  public editEmployee: Employee;  
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService){}

  // override ngonInit function
  ngOnInit() {
    this.getEmployees();
  }

  // for call our service
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe( //subcribe:For notefiy that data comes from the server 
      (response: Employee[]) => { //if get response back
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message); //for except the eror object
      }
    );
  }
  
  // For the Add Employee Form Feature
  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click(); //for call the Add Employee feanction & for get added data
    this.employeeService.addEmployee(addForm.value).subscribe( //service for call the backend
      (response: Employee) => {     //if we have a response
        console.log(response);      //print the response
        this.getEmployees();        // get the response
        addForm.reset();            // Add the response
      },
      (error: HttpErrorResponse) => {   //if we not a response  
        alert(error.message);           //otherwise print alert msg to user  
        addForm.reset();
      }
    );
  }

  // For the Edit/Update Employee data form and Functionality
  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe( //For call the update Function
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }      
    );
  }


  // For the delete Employee From Database
  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe( //call the deleteEmployeeMethod 
      (response: void) => {
        console.log(response);
        this.getEmployees();  //for the Reload everthing
      },
      (error: HttpErrorResponse) => {
        alert(error.message);  // for show the error massage
      }
    );
  }

  // Search Employee From the Data
  public searchEmployees(key: string): void {
    console.log(key);   //for the after pass the key key save in the data
    const results: Employee[] = [];  //employee:array  result:temporry variable
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 //check employee name
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 //check employee email
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 //check Employee phone
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {  //check Employee jobTitle
        results.push(employee); //push employee iterration those employee here
      }
    }
    this.employees = results;   //repsent the no list
    if (results.length === 0 || !key) {  //!key= for does't match the data
      this.getEmployees();  //& get Employee
    }
  }

//   submit():void
// {
// if(this.step==6){
// this.loan_step = true;
// if(this.employees.) { }
// }
// this.sdc.post(this.regform.value).subscribe();
//   console.log(this.regform.value);
//   this.r.navigate(['dashboard']);
// }

  // For Get the Toggel Warnning MSG on our WEB Page
  // Here i use for the Delete Employee verification
  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container'); //call the Container those present in .HTML 
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    // to open add model
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    //For open edit modal
    if (mode === 'edit') {
      this.editEmployee = employee; //pass the edit employee
      button.setAttribute('data-target', '#updateEmployeeModal');
      
    } 
    //For Open the delete model
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    // For the Button
    container.appendChild(button);
    button.click();
  }
}
