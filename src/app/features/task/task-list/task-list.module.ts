import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './task-list.component';
import { ListTableModule } from "./components/list-table/list-table.module";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    ListTableModule,
    RouterModule
]
})
export class TaskListModule { }
