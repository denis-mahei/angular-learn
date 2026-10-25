import { Service, signal } from '@angular/core';
import { Word } from '../word';

@Service()
export class WordService {
  words = signal<Word[]>([]);

  addWord(word: Omit<Word, 'id'>) {
    this.words.update((w) => [...w, { ...word, id: crypto.randomUUID() }]);
  };
}
