import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageResponse } from 'src/core/model/messageResponse';
import { Task } from 'src/core/model/task';
import { TaskService } from 'src/core/service/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tasks: Array<Task>;
  displayedColumns: string[] = ['ID', 'Description', 'CreationDate', 'Active', 'Action'];
  dataSource = [];

  constructor(private readonly taskService: TaskService, 
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getInit();
  }

  public delete(id: number) {
    this.taskService.deleteTask(id).subscribe((messageResponse: MessageResponse) => {
      this._snackBar.open(messageResponse.message, 'x');
      this.getInit();
    });
  }

  public goToAdd() {
    this.router.navigateByUrl('/add');
  }

  public goToEdit(id: number) {
    this.router.navigate(['/edit'],{queryParams: {id}});
  }

  private getInit() {
    this.taskService.listTask().subscribe((tasks:Array<Task>) => this.dataSource = tasks);
  }
}
