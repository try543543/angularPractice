import { Injectable } from '@angular/core';
import { Todo } from '../@models/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http:HttpClient) { }

  取得資料(){
    return this.http.get<Todo[]>('/api/todo2_16');
  }


}
