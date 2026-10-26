import { HttpClient, httpResource } from '@angular/common/http';
import { finalize, map } from 'rxjs';
import { inject, Service, signal } from '@angular/core';
import { Word } from '../word';
import { Todo } from '../todo';

const baseUrl = 'https://jsonplaceholder.typicode.com';

@Service()
export class WordService {
  private http = inject(HttpClient);
  words = signal<Word[]>([]);
  isLoading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);
  todosResource = httpResource<Todo[]>(() => ({
    url: `${baseUrl}/todos`,
    params: {
      _limit: 5,
    },
  }),{defaultValue: []});

  todosVal = this.todosResource.value
  todosErr = this.todosResource.error;
  todosLoading = this.todosResource.isLoading;


  loadWords() {
    this.isLoading.set(true);
    this.errorMsg.set(null);
    this.http
      .get<Todo[]>(`${baseUrl}/todos?_limit=5`)
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
        next: (words) => this.words.set(words),
        error: (err) => this.errorMsg.set(err.message),
      });
  }

  addWord(word: Omit<Word, 'id'>) {
    this.words.update((w) => [...w, { ...word, id: crypto.randomUUID() }]);
  }

  deleteWord(id: string) {
    this.words.update((words) => words.filter((w) => w.id !== id));
  }
}
