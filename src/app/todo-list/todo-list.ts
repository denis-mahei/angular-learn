import { Component, inject } from '@angular/core';
import { TodoService } from '../todo-service';
import { TodoItem } from '../todo-item/todo-item';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [TodoItem, ReactiveFormsModule],
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
})
export class TodoList {
  todoService = inject(TodoService);

  todoForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit() {
    this.todoService.addTodo({completed: false,title:this.todoForm.getRawValue().title})
  }

}
