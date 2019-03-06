import { Component, OnInit, Inject, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent, NgbDatepicker, NgbDatepickerConfig, NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge} from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { appService } from '../service/index';
declare var jQuery:any;

@Component({
  selector: 'app-viewtask',
  templateUrl: 'viewtask.component.html',
  styleUrls: ['viewtask.component.css']
})
export class ViewTaskComponent implements OnInit, OnDestroy {

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>(); 

  alltaskList : any = [];
  allProjectList : any = [];
  alltaskMasterList : any = [];
  task : any = {};
  screenLoader : boolean = false;
  modalHeading : string = '';
  modalBody : string = '';
  project : any = {
    "projectName":"",
    "projectId":""
  }

  constructor(public router: Router, public appService : appService) {

    this.screenLoader = false;
    this.appService.updatetask = null;
    appService.getTasks().subscribe((data :any) => {
      this.alltaskList = data;
      this.alltaskMasterList = data;
      this.screenLoader = false;
    });

    appService.getProjects().subscribe((data :any) => {
      this.allProjectList = data;
      this.screenLoader = false;
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    
  }

  getParentTaskName(item: any){
    var parentTaskName = '';
    if(item !== null && item !== undefined){
      if(item.parentTask !== null && item.parentTask !== undefined){
        parentTaskName = item.parentTask.parentTaskName;
      }
    }
    return parentTaskName;
  }

  endTask(task: any){
    this.screenLoader = true;
    task.status = 'C';
    this.appService.updateTasks(task).subscribe(
      (data: any) => {
        this.screenLoader = false;
        if(data){
          this.modalHeading = 'Success';
          this.modalBody = 'Task Ended Successfully';
          document.getElementById("endTaskModalOpener").click();
        }else{
          this.modalHeading = 'Error';
          this.modalBody = 'Error occured during End Task. Please try after some time.';
          document.getElementById("endTaskModalOpener").click();
        }        
        this.appService.getTasks().subscribe((data :any) => {
          this.alltaskMasterList = data;
          this.populateRequiredTaskList();
          this.screenLoader = false;
        });
      },
      (err: any) => {
          this.screenLoader = false;
          this.modalHeading = 'Error';
          this.modalBody = 'Error occured during End Task. Please try after some time.';
          document.getElementById("endTaskModalOpener").click();        
        }
      );
  }

  populateRequiredTaskList(){
    var projectId = this.project.projectId;
    if(projectId !== undefined && projectId !== null && projectId !== ''){
      this.alltaskList = [];
      for ( var i = 0; i < this.alltaskMasterList.length; i++)
      {
        if(this.alltaskMasterList[i].projectDetails !== null && this.alltaskMasterList[i].projectDetails.projectId === projectId){
          this.alltaskList.push(this.alltaskMasterList[i]);
        }
      }
    }else{
      this.alltaskList = this.alltaskMasterList;
    }
  }

  editTask(task: any){
    this.appService.updatetask = task;
    this.router.navigate(['/edittask']);
  }

  searchProjectPopup(){
    jQuery("#projectSelectOpener").click();
  }

  projectSearchAhead = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.allProjectList : this.allProjectList.filter(v => v.projectName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  formatter = (value: any) => value.projectName || '';

  selectedProjectItem(event: NgbTypeaheadSelectItemEvent): void {
    event.preventDefault();
    var projectDetails = event.item;
    this.project.projectName = projectDetails.projectName;
    jQuery("#projectSelectId").val(this.project.projectName);
    this.project.projectId = projectDetails.projectId;
    this.populateRequiredTaskList();
  }

  clearProjectItem(event){
    if (event.key !== "Enter") {
      this.project.projectName = "";
      this.project.projectId = "";
      this.alltaskList = this.alltaskMasterList;
    }
  }

  /* sort functions*/

  sortByStartDate(){
    this.alltaskList.sort((a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  }

  sortByEndDate(){
    this.alltaskList.sort((a, b) => {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    });
  }

  sortByPriority(){
    this.alltaskList.sort((a, b) => {
      return parseInt(a.priority) - parseInt(b.priority);
    });
  }

  sortByStatus(){
    this.alltaskList.sort((a, b) => {
      var titleA = a.status.toLowerCase(), titleB = b.status.toLowerCase();
      if (titleA < titleB) return -1; 
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  /* sort functions*/
}