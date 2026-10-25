import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs';
import { inject, Service, signal } from '@angular/core';
import { Word } from '../word';
import { Todo } from '../todo';

@Service()
export class WordService {
  private http = inject(HttpClient);
  words = signal<Word[]>([]);
  isLoading = signal<boolean>(false);

  baseUrl = 'https://jsonplaceholder.typicode.com';

  loadWords() {
    this.isLoading.set(true);
    this.http
      .get<Todo[]>(`${this.baseUrl}/todos?_limit=5`)
      .pipe(
        map((dtos) =>
          dtos.map((d) => ({
            id: String(d.id),
            term: d.title,
            translation: '',
          })),
        ),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (words) => {
          this.words.set(words);
        },
        error: (err) => {
          console.error('Catch: ', err.message);
        },
      });
  }

  addWord(word: Omit<Word, 'id'>) {
    this.words.update((w) => [...w, { ...word, id: crypto.randomUUID() }]);
  }

  deleteWord(id: string) {
    this.words.update((words) => words.filter((w) => w.id !== id));
  }
}
