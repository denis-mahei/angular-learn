import { Component, input, output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  imports: [],
  selector: 'app-todo-item',
  templateUrl: './todo-item.html',
})
export class TodoItem {
  todo = input.required<Todo>();
  deleted = output<number>();
  updated = output<Omit<Todo, 'title'>>();

  onDelete() {
    this.deleted.emit(this.todo().id);
  }
  onUpdate() {
    const id = this.todo().id;
    const completed = !this.todo().completed;
    this.updated.emit({ id, completed });
  }
}
