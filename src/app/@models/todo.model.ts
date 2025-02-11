//import { Todo } from './todo.model';
export interface Todo {
    Status: boolean;
    Thing: string; 
    Editing: boolean;
    TodoId: string;
}

export class TodoClass {
    Status: boolean;
    Thing: string; 
    Editing: boolean;
    TodoId: string;

    constructor(_thisng: string, _status: boolean = false){
        this.Thing = _thisng;
        this.Status = _status;
        this.Editing = false;
        this.TodoId = ' ';
    }

    toggle(){
        this.Status = !this.Status;
    }
} 
export enum TodoStatusType{
    All,
    Active,
    Completed
}