//import { Todo } from './todo.model';
export interface Todo {
    Status: boolean;
    Thing: string; 
    Editing: boolean;
}

export class TodoClass {
    Status: boolean;
    Thing: string; 

    constructor(_thisng: string, _status: boolean = false){
        this.Thing = _thisng;
        this.Status = _status;
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