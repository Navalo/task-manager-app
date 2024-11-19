import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/task';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/core/services/task.service';
import { ApiResponse } from 'src/app/shared/models/api-response';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent {
  @Input() tasks: Task[] = [];
  @Output() deleted = new EventEmitter<void>();
  id?: number;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  openDeleteModal(id: number): void {
    this.id = id;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  handleDelete(): void {
    if (this.id) {
      this.taskService.deleteTask(this.id).subscribe({
        next: (response: ApiResponse<void>) => {
          if (response.success) {
            this.toastr.success('Task Deleted successfully');
            this.deleted.emit();
          } else {
            this.toastr.error('Task Delete failed');
          }
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
    }
  }

  navigateToUpdate = (id: number) => this.router.navigate([`/task/update/${id}`]); 
}
