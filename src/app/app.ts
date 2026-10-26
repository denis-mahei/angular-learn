import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './todo-list/todo-list';


@Component({
  imports: [RouterOutlet, TodoList],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
