import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageResponse } from 'src/core/model/messageResponse';
import { Task } from 'src/core/model/task';
import { TaskService } from 'src/core/service/task.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  task: Task;
  addTaskForm = new FormGroup({
    description: new FormControl('', [Validators.required])
  });

  constructor(private readonly taskService: TaskService, 
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {

  }

  public addTask() {
    if(this.addTaskForm.valid) {
      this.task = {
        description: this.addTaskForm.get('description').value,
        active:true
      }
      this.taskService.addTask(this.task).subscribe((messageResponse: MessageResponse) => (this._snackBar.open(messageResponse.message, 'x')));    
    }
  }

  public backToList(){
    this.router.navigateByUrl('/list');
  }
}
