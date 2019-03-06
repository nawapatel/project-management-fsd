import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectSearchPipe } from './pipes/searchproject';
import { UserSearchPipe } from './pipes/searchuser';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [ProjectSearchPipe, UserSearchPipe],
  exports: [CommonModule, FormsModule, RouterModule, ProjectSearchPipe, UserSearchPipe],
  providers: [ProjectSearchPipe, UserSearchPipe]
})
export class CommonutilsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonutilsModule,      
    };
  }

  
}
