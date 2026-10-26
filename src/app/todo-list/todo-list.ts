import { Component, inject } from '@angular/core';
import { TodoService } from '../todo-service';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  imports: [TodoItem],
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
})
export class TodoList {
  todoService = inject(TodoService);

  protected readonly event = event;
}
