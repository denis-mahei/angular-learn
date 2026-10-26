import { Component, input } from '@angular/core';
import { Todo } from '../todo';

@Component({
  imports: [],
  selector: 'app-todo-item',
  templateUrl: './todo-item.html',
})
export class TodoItem {
  todo = input.required<Todo>();
}
