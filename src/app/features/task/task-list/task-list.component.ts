import { Component } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  tasks: Task[] = [];
  statusMessage: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    const userId = localStorage.getItem('userId');
    const id = userId ? parseInt(userId) : null;
    if(id){
      this.taskService.getTasks(id).subscribe({
        next: (response: ApiResponse<Task[]>) => {
          if (response.success) {
            this.tasks = response.data!;
          } else {
            this.statusMessage = response.message;
          }
        },
        error: (error) => {
          this.statusMessage = 'An error occurred while fetching tasks.';
        },
      });
    }
  }
}
