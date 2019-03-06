import { Component, OnInit, Inject, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent, NgbDatepicker, NgbDatepickerConfig, NgbDate, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge} from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { appService } from '../service';
declare var jQuery:any;

@Component({

  selector: 'app-updatetask',
  templateUrl: 'updatetask.component.html',
  styleUrls: ['updatetask.component.css']
})
export class UpdateTaskComponent implements OnInit, OnDestroy {

  @ViewChild('instanceProject') instanceProject: NgbTypeahead;
  @ViewChild('instanceParentTask') instanceParentTask: NgbTypeahead;
  @ViewChild('instanceUser') instanceUser: NgbTypeahead;
  focusUser$ = new Subject<string>();
  focusProject$ = new Subject<string>();
  focusParentTask$ = new Subject<string>();
  clickUser$ = new Subject<string>();
  clickProject$ = new Subject<string>();
  clickParentTask$ = new Subject<string>();
 
  task : any = {};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  calendarToday: NgbCalendar
  alltaskList : any = [];
  allProjectList : any = [];
  allParentTaskList : any = [];
  allUsersList : any = [];
  errorShow : boolean = false;
  screenLoader : boolean = false;
  errorMessage : string = '';
  modalHeading : string = '';
  modalBody : string = '';
  flow : string = 'addtask';
  selectedParentTaskObj : any = null;
  selectedProjectObj : any = null;
  selectedUserObj : any = null;
  isParentTaskSelection : boolean = false;

  constructor(calendar: NgbCalendar, config: NgbDatepickerConfig, public router: Router, private appService : appService) {
    this.calendarToday = calendar;
    if(this.appService.updatetask !== null){
      this.flow = 'updatetask';
    }
    this.screenLoader = true;
    appService.getProjects().subscribe((data :any) => {
      this.allProjectList = data;
      this.screenLoader = false;
    });
    this.screenLoader = false;
    appService.getUsers().subscribe((data :any) => {
      this.allUsersList = data;
      for ( var i = 0; i < this.allUsersList.length; i++)
      {
        this.allUsersList[i].fullName = this.allUsersList[i].lastName + ", " + this.allUsersList[i].firstName;
      }
      this.screenLoader = false;
    });

    if(this.flow === 'addtask'){
      this.resetButton();
    }
    if(this.flow === 'updatetask'){
      this.isParentTaskSelection = false;
      var edittask = this.appService.updatetask;
      var parentTask = null;
      var employeeDetails = null;
      var projectDetails = null;
      if(edittask.parentTask !== null && edittask.parentTask !== undefined){
        parentTask = edittask.parentTask;
        this.selectedParentTaskObj = parentTask;
      }
      if(edittask.employeeDetails !== null && edittask.employeeDetails !== undefined){
        employeeDetails = edittask.employeeDetails;
        this.selectedUserObj = employeeDetails;
      }
      if(edittask.projectDetails !== null && edittask.projectDetails !== undefined){
        projectDetails = edittask.projectDetails;
        this.selectedProjectObj = projectDetails;
      }
      this.task = {
        "projectName" : projectDetails === null ? '':projectDetails.projectName,
        "projectId" : projectDetails === null ? '':projectDetails.projectId,
        "taskName":edittask.taskName,
        "taskId":edittask.taskId,
        "priority":edittask.priority,
        "parentTaskId": parentTask === null ? '':parentTask.parentTaskId,
        "parentTaskName":parentTask === null ? '':parentTask.parentTaskName,
        "startDate":new Date(),
        "endDate":new Date(),
        "userId":employeeDetails === null ? '':employeeDetails.employeeId,
        "userName":employeeDetails === null ? '':(employeeDetails.lastName + ', ' + employeeDetails.firstName)
      };
      console.log('this.task : ' + JSON.stringify(this.task));
      this.fromDate = NgbDate.from(this.constructDateFromService(edittask.startDate));
      this.toDate = NgbDate.from(this.constructDateFromService(edittask.endDate));
    }

    const currentDate = new Date();
    config.minDate = {year:currentDate.getFullYear(), month:currentDate.getMonth()+1, day: currentDate.getDate()};
    config.maxDate = {year: 2099, month: 12, day: 31};
    config.outsideDays = 'hidden';
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.task = {};
  }

  
  updateTask(task: any){
    if(this.flow === 'addtask'){
      if(this.isParentTaskSelection){
        var submitAddParentTask = {
          "parentTaskName": task.taskName,
          "projectId": task.projectId
        };
                
        this.screenLoader = true;
        this.appService.updateParentTasks(submitAddParentTask).subscribe(
          (data: any) => {
            this.screenLoader = false;
            if(data){
              this.modalHeading = 'Success';
              this.modalBody = 'Parent Task Added Successfully';
              document.getElementById("submitModalOpener").click();
            }else{
              this.modalHeading = 'Error';
              this.modalBody = 'Error occured during Add Task. Please try after some time.';
              document.getElementById("submitModalOpener").click();     
            }
          },
          (err: any) => {
              this.screenLoader = false;
              this.modalHeading = 'Error';
              this.modalBody = 'Error occured during Add Task. Please try after some time.';
              document.getElementById("submitModalOpener").click();        
            }
          );
      }else{
        var submitAddTask = {
          "taskName": task.taskName,
          "startDate": this.convertDateJsonToString(this.fromDate),
          "endDate": this.convertDateJsonToString(this.toDate),
          "priority": task.priority,
          "status": "A",
          "parentTask": this.selectedParentTaskObj,
          "employeeDetails": this.selectedUserObj,
          "projectDetails": this.selectedProjectObj
        };

        this.screenLoader = true;
        this.appService.updateTasks(submitAddTask).subscribe(
          (data: any) => {
            this.screenLoader = false;
            if(data){
              this.modalHeading = 'Success';
              this.modalBody = 'Task Added Successfully';
              document.getElementById("submitModalOpener").click();
            }else{
              this.modalHeading = 'Error';
              this.modalBody = 'Error occured during Add Task. Please try after some time.';
              document.getElementById("submitModalOpener").click();  
            }
          },
          (err: any) => {
              this.screenLoader = false;
              this.modalHeading = 'Error';
              this.modalBody = 'Error occured during Add Task. Please try after some time.';
              document.getElementById("submitModalOpener").click();        
            }
          );
      }
    }
    if(this.flow === 'updatetask'){
      var submitUpdateTask = {
        "taskId": task.taskId,
        "taskName": task.taskName,
        "startDate": this.convertDateJsonToString(this.fromDate),
        "endDate": this.convertDateJsonToString(this.toDate),
        "priority": task.priority,
        "status": "A",
        "parentTask": this.selectedParentTaskObj,
        "employeeDetails": this.selectedUserObj,
        "projectDetails": this.selectedProjectObj
      };

      this.screenLoader = true;
      this.appService.updateTasks(submitUpdateTask).subscribe(
        (data: any) => {
          this.screenLoader = false;
          if(data){
            this.modalHeading = 'Success';
            this.modalBody = 'Task Edited Successfully';
            document.getElementById("submitModalOpener").click();
          }else{
            this.modalHeading = 'Error';
            this.modalBody = 'Error occured during Add Task. Please try after some time.';
            document.getElementById("submitModalOpener").click();  
          }          
        },
        (err: any) => {
            this.screenLoader = false;
            this.modalHeading = 'Error';
            this.modalBody = 'Error occured during Add Task. Please try after some time.';
            document.getElementById("submitModalOpener").click();        
          }
        );
    }
  }

  constructDateFromService(datestring: string){
    var res = datestring.split("/");
    const date: NgbDateStruct = { day: parseInt(res[1]), month: parseInt(res[0]), year: parseInt(res[2]) };
    return date;
  }

  resetButton(){
    this.task = {
      "projectName" : "",
      "projectId" : "",
      "taskName":"",
      "taskId":"",
      "priority":"15",
      "parentTaskId":"",
      "parentTaskName":"",
      "startDate":new Date(),
      "endDate":new Date(),
      "userId":"",
      "userName":""
    };
    this.fromDate = this.calendarToday.getToday();
    this.toDate = this.calendarToday.getNext(this.calendarToday.getToday(), 'd', 1);
    this.flow = 'addtask';
  }
  
  viewTaskScreen(){
    document.getElementById("view-task").click();
  }

  /* Datepicker functions*/
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  convertDateJsonToString(json: any){
    if(json !== undefined && json !== null){
      return json.month + '/' + json.day + '/' + json.year;
    }
  }
  
  searchProjectPopup(){
    jQuery("#projectSelectOpener").click();
  }

  projectSearchAhead = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickProject$.pipe(filter(() => !this.instanceProject.isPopupOpen()));
    const inputFocus$ = this.focusProject$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.allProjectList : this.allProjectList.filter(v => v.projectName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  formatterProjectName = (value: any) => value.projectName || '';

  selectedProjectItem(event: NgbTypeaheadSelectItemEvent): void {
    event.preventDefault();
    var projectDetails = event.item;
    this.task.projectName = projectDetails.projectName;
    jQuery("#projectSelectId").val(this.task.projectName);
    this.task.projectId = projectDetails.projectId;
    this.selectedProjectObj = projectDetails;
    this.appService.getParentTaskForProjectId(this.task.projectId).subscribe((data :any) => {
      this.allParentTaskList = data;
      this.screenLoader = false;
    });
  }

  clearProjectItem(event){
    if (event.key !== "Enter") {
      this.task.projectName = "";
      this.task.projectId = "";
      this.task.parentTaskName = "";
      this.task.parentTaskId = "";
      this.allParentTaskList = [];
      this.selectedProjectObj = null;
    }
  }

  searchParentTaskPopup(){
    jQuery("#parentTaskSelectOpener").click();
  }

  parentTaskSearchAhead = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickParentTask$.pipe(filter(() => !this.instanceParentTask.isPopupOpen()));
    const inputFocus$ = this.focusParentTask$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.allParentTaskList : this.allParentTaskList.filter(v => v.parentTaskName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  formatterParentTaskName = (value: any) => value.parentTaskName || '';

  selectedParentTaskItem(event: NgbTypeaheadSelectItemEvent): void {
    event.preventDefault();
    var parentTaskDetails = event.item;
    this.task.parentTaskName = parentTaskDetails.parentTaskName;
    jQuery("#parentTaskSelectId").val(this.task.parentTaskName);
    this.task.parentTaskId = parentTaskDetails.parentTaskId;
    this.selectedParentTaskObj = parentTaskDetails;
  }

  clearParentTaskItem(event){
    if (event.key !== "Enter") {
      this.task.parentTaskName = "";
      this.task.parentTaskId = "";
      this.selectedParentTaskObj = null;
    }
  }

  searchUserPopup(){
    jQuery("#userSelectOpener").click();
  }

  userEmployeeSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickUser$.pipe(filter(() => !this.instanceUser.isPopupOpen()));
    const inputFocus$ = this.focusUser$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.allUsersList : this.allUsersList.filter(v => v.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  formatterUserSelect = (value: any) => (value.lastName + ", " + value.firstName) || '';

  selectedUserItem(event: NgbTypeaheadSelectItemEvent): void {
    event.preventDefault();
    var userDetails = event.item;
    this.task.userName = userDetails.fullName;
    jQuery("#userSelectId").val(this.task.userName);
    this.task.userId = userDetails.employeeId;
    this.selectedUserObj = userDetails;
  }

  clearUserItem(event){
    if (event.key !== "Enter") {
      this.task.userName = "";
      this.task.userId = "";
      this.selectedUserObj = null;
    }
  }

}



