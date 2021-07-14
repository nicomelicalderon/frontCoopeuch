import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/core/model/task';
import { TaskService } from 'src/core/service/task.service';
import { map } from 'rxjs/operators';
import { MessageResponse } from 'src/core/model/messageResponse';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editTaskForm: FormGroup;
  constructor(private readonly taskService: TaskService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe((params: ParamMap) => {
        const id: number = Number(params.get('id'));
        if (id) {
          this.getTask(id);
        }
      });
  }

  public editTask() {
    if(this.editTaskForm.valid){
      const task: Task = {
        id: this.editTaskForm.get('id').value,
        description: this.editTaskForm.get('description').value,
        creationDate: this.editTaskForm.get('creationDate').value,
        active: this.editTaskForm.get('active').value
      }
      this.taskService.editTask(task).subscribe((messageResponse: MessageResponse) => (this._snackBar.open(messageResponse.message, 'x'))); 
    }
  }

  public backToList() {
    this.router.navigateByUrl('/list');
  }

  private getTask(id: number) {
    this.taskService.getTask(id).subscribe((task: Task) => {
      this.editTaskForm = new FormGroup({
        id: new FormControl(task.id),
        description: new FormControl(task.description, [Validators.required]),
        creationDate: new FormControl(task.creationDate),
        active: new FormControl(task.active)
      });
    });
  }

}
