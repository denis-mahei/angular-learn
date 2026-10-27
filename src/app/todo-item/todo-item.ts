import { Component, input, output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  imports: [],
  selector: 'app-todo-item',
  templateUrl: './todo-item.html',
})
export class TodoItem {
  todo = input.required<Todo>();
  deleted = output<number>()

  onDelete() {
    console.log('deleted', this.todo().id);
    this.deleted.emit(this.todo().id)
  }
}
