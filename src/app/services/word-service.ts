import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Word } from '../word';
import { Todo } from '../todo';

@Service()
export class WordService {
  private http = inject(HttpClient);
  words = signal<Word[]>([]);

  baseUrl = 'https://jsonplaceholder.typicode.com';

  loadWords() {
    this.http.get<Todo[]>(`${this.baseUrl}/todos?_limit=5`).subscribe((res) => {
      const newTodo = res.map((todo) => {
        return {
          id: String(todo.id),
          term: todo.title,
          translation: '',
        };
      });
        this.words.set(newTodo);
    });
  }

  addWord(word: Omit<Word, 'id'>) {
    this.words.update((w) => [...w, { ...word, id: crypto.randomUUID() }]);
  }

  deleteWord(id: string) {
    this.words.update((words) => words.filter((w) => w.id !== id));
  }
}
