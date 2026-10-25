import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordList } from './word-list/word-list';

@Component({
  imports: [RouterOutlet, WordList],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
