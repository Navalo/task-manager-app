import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
      import('./task-list/task-list.module').then(
        (m) => m.TaskListModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create-task/create-task.module').then(
        (m) => m.CreateTaskModule
      ),
  },
  {
    path: 'update/:id',
    loadChildren: () =>
      import('./update-task/update-task.module').then(
        (m) => m.UpdateTaskModule
      ),
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
