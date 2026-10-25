import { Component, input, output } from '@angular/core';
import { Word } from '../word';

@Component({
  imports: [],
  selector: 'app-word-card',
  templateUrl: './word-card.html',
})
export class WordCard {
  word = input.required<Word>();

  deletedWord = output<string>();

  onDelete() {
    this.deletedWord.emit(this.word().id)
  };
}
