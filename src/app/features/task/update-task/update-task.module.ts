import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateTaskRoutingModule } from './update-task-routing.module';
import { UpdateTaskComponent } from './update-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UpdateTaskComponent
  ],
  imports: [
    CommonModule,
    UpdateTaskRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UpdateTaskModule { }
