import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appService } from '../service'; 
import { UpdateViewProjectComponent } from './updateviewproject.component';
import { UpdateViewProjectRoutingModule } from './updateviewproject-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule, NgbTypeaheadModule, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { CommonutilsModule } from '../commonutils.module';

@NgModule({
  imports: [UpdateViewProjectRoutingModule, FormsModule, CommonModule, NgbModule.forRoot(), NgbTypeaheadModule.forRoot(), CommonutilsModule.forRoot()],
  declarations: [UpdateViewProjectComponent],
  exports: [UpdateViewProjectComponent, FormsModule],
  providers: [appService]
})

export class UpdateViewProjectModule { 

}