import { Component, EventEmitter, Output } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-delete-task-model',
  templateUrl: './delete-task-model.component.html',
  styleUrls: ['./delete-task-model.component.scss']
})
export class DeleteTaskModelComponent {
  @Output() deleteConfirmed = new EventEmitter<void>();

  confirmDelete(): void {
    this.deleteConfirmed.emit();
    this.closeModal();
  }

  closeModal(): void {
    const modalElement = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.dispose();
  }
}
