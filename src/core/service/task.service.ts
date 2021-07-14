import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageResponse } from '../model/messageResponse';
import { Task } from '../model/task';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private readonly http: HttpClient) { 
    
  }

  listTask(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${environment.apiUrl}/task`);
  }

  getTask(id: number): Observable<Task> {
    let params = new HttpParams();
    params = params.append('id', `${id}`);
    return this.http.get<Task>(`${environment.apiUrl}/task/id`, {params: params});
  }

  addTask(task: Task): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${environment.apiUrl}/task`, task);
  }

  editTask(task: Task): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${environment.apiUrl}/task`, task);
  }

  deleteTask(id: number): Observable<MessageResponse> {
    let params = new HttpParams();
    params = params.append('id', `${id}`);
    return this.http.delete<MessageResponse>(`${environment.apiUrl}/task`, {params: params});
  }
}
