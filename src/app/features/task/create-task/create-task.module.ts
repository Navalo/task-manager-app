import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTaskRoutingModule } from './create-task-routing.module';
import { CreateTaskComponent } from './create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    CreateTaskRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CreateTaskModule { }
