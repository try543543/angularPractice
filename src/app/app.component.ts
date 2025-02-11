import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';
import { Todo, TodoClass, TodoStatusType } from './@models/todo.model';
import { HttpClient, HttpClientModule } from '@angular/common/http'; //只能用在NgModule
//import { provideHttpClient } from '@angular/common/http'; //獨立組件 (Standalone Components) 使用方式

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'TODO';
  placeholder = 'What needs to be done!???'
  toggleAllBtn = false;
  nowTodoStatusType = TodoStatusType.All;
  TodoStatusType = TodoStatusType;

  todoInputModel = '';


  check1 = false;
  check2 = false;
  check3 = false;

  todoDataList:Todo[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   this.http.get<Todo[]>('/api/todo2_16').subscribe(data=>{
    this.todoDataList = data;
   });
  }


  toggleAll() {
    console.log('toggleAll clicked');
    this.toggleAllBtn = ! this.toggleAllBtn;
    this.todoDataList.forEach(data =>{
      data.Status = this.toggleAllBtn;
    });
  }

  clickCheck(item: Todo){
    item.Status = !item.Status;
    if(this.todoCompleted.length === this.todoDataList.length){
      this.toggleAllBtn = true;
    } else {
      this.toggleAllBtn = false;
    }
  }

  delete(todo: Todo){
     this.todoDataList=this.todoDataList.filter(data=>data!== todo);

}

getData() {
  this.http.get<Todo[]>('/api/todo2_16').subscribe(data=>{
   this.todoDataList = data;
   console.log(this.todoDataList);
  });
 }

  add(){
    const todo: Todo = {
      Status: false,
      Thing:  this.todoInputModel,
      Editing: false,
      TodoId :''
    }
     // this.http.post('/api/todo2_16',todo).subscribe(()=>{
     //   this.getData();
     // }) 簡單粗暴 寫入資料庫再讀取 第一種

       this.http.post<Todo>('/api/todo2_16',todo).subscribe(data =>{
        this.todoDataList.push(data);
        console.log(this.todoDataList);
      }) // 用push 第二種直接將資料庫寫入的值吐回前端

      //this.todoDataList.push(todo);
      
      this.todoInputModel = ' ';
   }
   edit(item: Todo){
    item.Editing = true;
   }
  
   update(item: Todo,){ //value: string有ngmodel 就不需要
   // item.Thing = value;  有ngmodel 就不需要
   this.http.put('/api/todo2_16/' + item.TodoId, item).subscribe();
    item.Editing = false;
   }

   setTodoStatusType(type: number) {
    this.nowTodoStatusType = type;
   }
   get nowTodoList(){
    let list: Todo[] = [];

    switch (this.nowTodoStatusType) {
      case TodoStatusType.Active:
        list=this.todoActive;
        break;
      case TodoStatusType.Completed:
        list = this.todoCompleted;
        break;
      default:
        list = this.todoDataList;
        break;
    }
    return list;
   }

   get todoActive(): Todo[] {
    return this.todoDataList.filter(data => !data.Status); 
     }

   get todoCompleted(): Todo[]{
      return this.todoDataList.filter(data => data.Status); 
     }

     clearCompleted(){
      this.todoDataList = this.todoActive;
     }
   
}