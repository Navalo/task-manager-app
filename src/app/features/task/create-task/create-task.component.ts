import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  taskFormGroup: FormGroup;

  constructor(private taskService: TaskService, private router: Router, private toastr: ToastrService) {
    this.taskFormGroup = new FormGroup({
      title: new FormControl('',[Validators.required]),
      description: new FormControl(''),
    });
  }

  onSubmit() {
    if(this.taskFormGroup.invalid){
      return;
    }

    const userId = localStorage.getItem("userId");
    const parsedId = userId ? parseInt(userId) : null;

    if(parsedId){
      const payload = {userId:parsedId,...this.taskFormGroup.value};

      this.taskService.createTask(payload).subscribe({
        next: (response: any) =>{
          if (response.success) {
            this.toastr.success("Task Created SuccessFully")
            this.taskFormGroup.reset();
          } else {
            this.toastr.error("Task Created Failed")
          }
        },
        error: (err) => {
          this.toastr.error(err.message)
          
        }
      });
    }
  }
}
