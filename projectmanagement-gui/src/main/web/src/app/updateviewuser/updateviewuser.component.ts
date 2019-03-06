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
  selector: 'app-updateviewuser',
  templateUrl: 'updateviewuser.component.html',
  styleUrls: ['updateviewuser.component.css']
})
export class UpdateViewUserComponent implements OnInit, OnDestroy {

  user : any = {};
  allUsersList : any = [];
  allUsersMasterList : any = [];
  errorShow : boolean = false;
  screenLoader : boolean = false;
  errorMessage : string = '';
  modalHeading : string = '';
  modalBody : string = '';
  flow : string = 'adduser';
  searchUserString : string = '';

  constructor(public router: Router, private appService : appService) {    
    
    this.user = {
      "employeeId":"",
      "firstName":"",
      "lastName":""
    };

    this.screenLoader = false;
    appService.getUsers().subscribe((data :any) => {
      this.allUsersList = data;
      this.allUsersMasterList = data;
      this.screenLoader = false;
    });
  }

  ngOnInit() {
    this.user = {
      "employeeId":"",
      "firstName":"",
      "lastName":""
    };
    this.flow = 'adduser';    
  }

  ngOnDestroy() {
    this.user = {};
    this.allUsersList = [];  
  }

  updateUser(user: any){
    
      var submitUser = {};
      submitUser = {
        "employeeId":user.employeeId,
        "firstName":user.firstName,
        "lastName":user.lastName,
        "status": "A"
      };
      
      this.screenLoader = true;
      this.appService.updateUsers(submitUser).subscribe(
        (data: any) => {
          this.screenLoader = false;
          if(data){
            this.screenLoader = true;
            this.appService.getUsers().subscribe((data :any) => {
              this.allUsersList = data;
              this.allUsersMasterList = data;
              this.screenLoader = false;
            });
            if(data){
              this.modalHeading = 'Success';
              if(this.flow === 'adduser'){
                this.modalBody = 'User Added Successfully';
              }
              if(this.flow === 'updateuser'){
                this.modalBody = 'User Edited Successfully';
              }
              document.getElementById("submitModalOpener").click();
              this.ngOnInit();
            }else{
              this.modalHeading = 'Error';
              this.modalBody = 'Error occured during Add Task. Please try after some time.';
              document.getElementById("submitModalOpener").click(); 
            }
          }else{
            this.modalHeading = 'Error';
            this.modalBody = 'Error occured during Add Task. Please try after some time.';
            document.getElementById("submitModalOpener").click(); 
            this.ngOnInit();
          }
        },
        (err: any) => {
            this.screenLoader = false;
            this.modalHeading = 'Error';
            this.modalBody = 'Error occured during Add Task. Please try after some time.';
            document.getElementById("submitModalOpener").click();      
            this.ngOnInit();  
          }
        );
  }

  editUser(user : any){
    this.flow = 'updateuser';
    this.user = {
      "employeeId":user.employeeId,
      "firstName":user.firstName,
      "lastName":user.lastName,
      "status": user.status
      
    };
    jQuery('html, body').animate({
      scrollTop: jQuery("#update-view-user").offset().top
    }, 1000);
  }

  deleteUser(user: any){
    this.screenLoader = true;
    user.status = 'I';
      this.appService.updateUsers(user).subscribe(
        (data: any) => {
          this.screenLoader = false;
          if(data){
            this.screenLoader = true;
            this.appService.getUsers().subscribe((data :any) => {
              this.allUsersList = data;
              this.allUsersMasterList = data;
              this.screenLoader = false;
            });
            this.modalHeading = 'Success';
            this.modalBody = 'User Deleted Successfully';
            document.getElementById("submitModalOpener").click();
            this.ngOnInit();
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

  resetButton(){
    this.ngOnInit();
  }

  /* sort functions*/
  sortByFirstName(){
    this.allUsersList = [];
    this.allUsersList = this.allUsersMasterList;
    this.allUsersList.sort((a, b) => {
      var titleA = a.firstName.toLowerCase(), titleB = b.firstName.toLowerCase();
      if (titleA < titleB) return -1; 
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  sortByLastName(){
    this.allUsersList = [];
    this.allUsersList = this.allUsersMasterList;
    this.allUsersList.sort((a, b) => {
      var titleA = a.lastName.toLowerCase(), titleB = b.lastName.toLowerCase();
      if (titleA < titleB) return -1; 
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  sortByEmployeeId(){
    this.allUsersList = [];
    this.allUsersList = this.allUsersMasterList;
    this.allUsersList.sort((a, b) => {
      var titleA = a.employeeId.toLowerCase(), titleB = b.employeeId.toLowerCase();
      if (titleA < titleB) return -1; 
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  /* sort functions*/

}



