import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserList } from './user-list/user-list';

@Component({
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, UserList],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
