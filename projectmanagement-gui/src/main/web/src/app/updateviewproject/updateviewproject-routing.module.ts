import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdateViewProjectComponent } from './updateviewproject.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: UpdateViewProjectComponent },
      { path: 'updateviewproject', component: UpdateViewProjectComponent }
    ])
  ],
  exports: [RouterModule]
})
export class UpdateViewProjectRoutingModule { }
