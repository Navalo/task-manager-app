import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableComponent } from './list-table.component';
import { DeleteTaskModelModule } from '../delete-task-model/delete-task-model.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListTableComponent
  ],
  imports: [
    CommonModule,
    DeleteTaskModelModule,
    RouterModule
  ],
  exports: [ListTableComponent]
})
export class ListTableModule { }
