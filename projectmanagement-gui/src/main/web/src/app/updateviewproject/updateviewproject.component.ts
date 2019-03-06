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
  selector: 'app-updateviewproject',
  templateUrl: 'updateviewproject.component.html',
  styleUrls: ['updateviewproject.component.css']
})
export class UpdateViewProjectComponent implements OnInit, OnDestroy {

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
 
  project : any = {};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  calendarToday: NgbCalendar
  allProjectMasterList : any = [];
  allProjectList : any = [];
  allUsersList : any = [];
  errorShow : boolean = false;
  screenLoader : boolean = false;
  checkBoxSelect : boolean = false;
  errorMessage : string = '';
  modalHeading : string = '';
  modalBody : string = '';
  flow : string = 'addproject';
  selectedUserObj : any = {}; 
  searchProjectString : string = '';

  constructor(calendar: NgbCalendar, config: NgbDatepickerConfig, public router: Router, private appService : appService) {
    this.calendarToday = calendar;
    
    this.project = {
      "projectId":"",
      "projectName":"",
      "priority":"15",
      "startDate":new Date(),
      "endDate":new Date(),
      "managerName":"",
      "managerId":""
    };
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);

    const currentDate = new Date();
    config.minDate = {year:currentDate.getFullYear(), month:currentDate.getMonth()+1, day: currentDate.getDate()};
    config.maxDate = {year: 2099, month: 12, day: 31};
    config.outsideDays = 'hidden';

    this.screenLoader = false;
    appService.getUsers().subscribe((data :any) => {
      this.allUsersList = data;
      for ( var i = 0; i < this.allUsersList.length; i++)
      {
        this.allUsersList[i].fullName = this.allUsersList[i].lastName + ", " + this.allUsersList[i].firstName;
      }
      this.screenLoader = false;
    });
    appService.getProjects().subscribe((data :any) => {
      this.allProjectMasterList = data;
      this.allProjectList = data;
      this.screenLoader = false;
    });

  }

  ngOnInit() {
    this.project = {
      "projectId":"",
      "projectName":"",
      "priority":"15",
      "startDate":new Date(),
      "endDate":new Date(),
      "managerName":"",
      "managerId":""
    };
    this.fromDate = this.calendarToday.getToday();
    this.toDate = this.calendarToday.getNext(this.calendarToday.getToday(), 'd', 1);
    this.flow = 'addproject';
    this.checkBoxSelect = false;
  }

  ngOnDestroy() {
    this.project = {};  
    this.allProjectList = [];  
    this.allUsersList = [];  
  }

  formatter = (value: any) => (value.lastName + ", " + value.firstName) || '';

  managerEmployeeSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.allUsersList : this.allUsersList.filter(v => v.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  searchUserPopup(){
    jQuery("#managerSelectOpener").click();
  }

  updateProject(project: any){
    if(this.flow === 'addproject'){
      var submitProject = {};
      var startDate = "";
      var endDate = "";
      if(this.checkBoxSelect){
        startDate = this.convertDateJsonToString(this.fromDate);
        endDate = this.convertDateJsonToString(this.toDate);
      }
      submitProject = {
        "projectName": project.projectName,
        "startDate": startDate,
        "endDate": endDate,
        "priority": project.priority,
        "status": "In-Progress",
        "managerId": project.managerId
      };
      
      this.screenLoader = true;
      this.appService.updateProjects(submitProject).subscribe(
        (data: any) => {
          this.screenLoader = false;
          if(data){
            this.screenLoader = true;
            this.appService.getProjects().subscribe((data :any) => {
              this.allProjectMasterList = data;
              this.allProjectList = data;
              this.screenLoader = false;
            });
            if(data){
              this.modalHeading = 'Success';
              this.modalBody = 'Project Added Successfully';
              document.getElementById("submitModalOpener").click();
            }else{
              this.modalHeading = 'Error';
              this.modalBody = 'Error occured during Add Task. Please try after some time.';
              document.getElementById("submitModalOpener").click(); 
            }
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
    if(this.flow === 'updateproject'){
      var submitProject = {};
      var startDate = "";
      var endDate = "";
      if(this.checkBoxSelect){
        startDate = this.convertDateJsonToString(this.fromDate);
        endDate = this.convertDateJsonToString(this.toDate);
      }
      submitProject = {
        "projectId": project.projectId,
        "projectName": project.projectName,
        "startDate": startDate,
        "endDate": endDate,
        "priority": project.priority,
        "status": "In-Progress",
        "managerId": project.managerId
      };
      
      this.screenLoader = true;
      this.appService.updateProjects(submitProject).subscribe(
        (data: any) => {
          this.screenLoader = false;
          if(data){
            this.screenLoader = true;
            this.appService.getProjects().subscribe((data :any) => {
              this.allProjectMasterList = data;
              this.allProjectList = data;
              this.screenLoader = false;
            });
            if(data){
              this.modalHeading = 'Success';
              this.modalBody = 'Project Updated Successfully';
              document.getElementById("submitModalOpener").click();
            }else{
              this.modalHeading = 'Error';
              this.modalBody = 'Error occured during Add Task. Please try after some time.';
              document.getElementById("submitModalOpener").click(); 
            }
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

  selectedManagerItem(event: NgbTypeaheadSelectItemEvent): void {
    event.preventDefault();
    var managerDetails = event.item;
    this.project.managerName = managerDetails.fullName;
    jQuery("#managerSelectId").val(this.project.managerName);
    this.project.managerId = managerDetails.employeeId;
  }

  clearManagerItem(event){
    if (event.key !== "Enter") {
      this.project.managerName = "";
      this.project.managerId = "";
    }
  }

  editProject(project : any){
    this.flow = 'updateproject';
    var managerDetails : any = {};
    for ( var i = 0; i < this.allUsersList.length; i++)
    {
      if(this.allUsersList[i].employeeId === project.managerId){
        managerDetails = this.allUsersList[i];
      }
    }
    var managerName = '';
    var managerId = '';
    if(managerDetails.status === 'A'){
      managerName = managerDetails.lastName + ', ' + managerDetails.firstName;
      managerId = managerDetails.employeeId; 
    }
    this.project = {
      "projectId":project.projectId,
      "projectName":project.projectName,
      "priority":project.priority,
      "startDate":new Date(),
      "endDate":new Date(),
      "managerName":managerName,
      "managerId":managerId
    };
    if(project.startDate !== null && project.startDate !== undefined && project.startDate !== ''){
      this.checkBoxSelect = true;
      setTimeout(()=>{
        this.fromDate = NgbDate.from(this.constructDateFromService(project.startDate));
        this.toDate = NgbDate.from(this.constructDateFromService(project.endDate));
      },100);
    }else{
      this.checkBoxSelect = false;
      setTimeout(()=>{
        this.fromDate = this.calendarToday.getToday();
        this.toDate = this.calendarToday.getNext(this.calendarToday.getToday(), 'd', 1);
      },100);
    }
    jQuery('html, body').animate({
      scrollTop: jQuery("#update-view-project").offset().top
    }, 1000);
  }

  constructDateFromService(datestring: string){
    var res = datestring.split("/");
    const date: NgbDateStruct = { day: parseInt(res[1]), month: parseInt(res[0]), year: parseInt(res[2]) };
    return date;
  }

  endProject(project: any){
    this.screenLoader = true;
    project.status = 'Completed';
    this.appService.updateProjects(project).subscribe(
      (data: any) => {
        this.screenLoader = false;
        if(data){
          this.modalHeading = 'Success';
          this.modalBody = 'Project Suspended Successfully';
          document.getElementById("submitModalOpener").click();
        }else{
          this.modalHeading = 'Error';
          this.modalBody = 'Error occured during End Task. Please try after some time.';
          document.getElementById("submitModalOpener").click(); 
        }
        this.appService.getProjects().subscribe((data :any) => {
          this.allProjectMasterList = data;
          this.allProjectList = data;
        });
      },
      (err: any) => {
          this.screenLoader = false;
          this.modalHeading = 'Error';
          this.modalBody = 'Error occured during End Task. Please try after some time.';
          document.getElementById("submitModalOpener").click();  
          this.appService.getProjects().subscribe((data :any) => {
            this.allProjectMasterList = data;
            this.allProjectList = data;
          });      
        }
      );
  }

  resetButton(){
    this.ngOnInit();
  }

  /* sort functions*/
  sortByStartDate(){
    this.allProjectList = [];
    this.allProjectList = this.allProjectMasterList;
    this.allProjectList.sort((a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  }

  sortByEndDate(){
    this.allProjectList = [];
    this.allProjectList = this.allProjectMasterList;
    this.allProjectList.sort((a, b) => {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    });
  }

  sortByPriority(){
    this.allProjectList = [];
    this.allProjectList = this.allProjectMasterList;
    this.allProjectList.sort((a, b) => {
      return parseInt(a.priority) - parseInt(b.priority);
    });
  }

  sortByStatus(){
    this.allProjectList = [];
    this.allProjectList = this.allProjectMasterList;
    this.allProjectList.sort((a, b) => {
      var titleA = a.status.toLowerCase(), titleB = b.status.toLowerCase();
      if (titleA < titleB) return -1; 
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  /* sort functions*/

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
  /* Datepicker functions*/

}



