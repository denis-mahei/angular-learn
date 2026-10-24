import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCard } from './user-card/user-card';

@Component({
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, UserCard],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
