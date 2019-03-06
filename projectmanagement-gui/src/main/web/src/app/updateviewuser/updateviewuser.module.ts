import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appService } from '../service'; 
import { UpdateViewUserComponent } from './updateviewuser.component';
import { UpdateViewUserRoutingModule } from './updateviewuser-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule, NgbTypeaheadModule, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { CommonutilsModule } from '../commonutils.module';

@NgModule({
  imports: [UpdateViewUserRoutingModule, FormsModule, CommonModule, NgbModule.forRoot(), NgbTypeaheadModule.forRoot(), CommonutilsModule.forRoot()],
  declarations: [UpdateViewUserComponent],
  exports: [UpdateViewUserComponent, FormsModule],
  providers: [appService]
})

export class UpdateViewUserModule { 

}