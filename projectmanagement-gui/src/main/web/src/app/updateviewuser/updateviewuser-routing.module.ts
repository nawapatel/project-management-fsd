import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdateViewUserComponent } from './updateviewuser.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'updateviewuser', component: UpdateViewUserComponent }
    ])
  ],
  exports: [RouterModule]
})
export class UpdateViewUserRoutingModule { }
