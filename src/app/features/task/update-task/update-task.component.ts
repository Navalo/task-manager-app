import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from '../models/task';
import { ApiResponse } from 'src/app/shared/models/api-response';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  taskFormGroup: FormGroup;
  id: string | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.taskFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      isCompleted: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getTask();
    }
  }

  getTask() {
    const parsedId = parseInt(this.id!);
    this.taskService.getTaskById(parsedId).subscribe({
      next: (response: ApiResponse<Task>) => {
        if (response.success) {
          this.taskFormGroup.patchValue({
            title: response.data?.title,
            description: response.data?.description,
            isCompleted: response.data?.isCompleted
          });
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (err) => {
        this.toastr.error('An error occurred while fetching the task.');
      }
    });
  }

  onSubmit() {
    if (this.taskFormGroup.invalid) {
      return;
    }

    const parsedId = this.id ? parseInt(this.id) : null;
    if (parsedId) {
      this.taskService.updateTask(parsedId, this.taskFormGroup.value).subscribe({
        next: (response: ApiResponse<Task>) => {
          if (response.success) {
            this.toastr.success('Task updated successfully');
          } else {
            this.toastr.error('Task update failed');
          }
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
      });
    }
  }
}
