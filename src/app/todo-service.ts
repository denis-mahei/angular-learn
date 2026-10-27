import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Todo } from './todo';
import { map } from 'rxjs';


@Service()
export class TodoService {
  private httpClient = inject(HttpClient);
  url = 'https://jsonplaceholder.typicode.com';
  limit = signal<number>(10);
  todoResource = httpResource<Todo[]>(
    () => ({
      url: `${this.url}/todos`,
      params: {
        _limit: this.limit(),
      },
    }),
    { defaultValue: [] },
  );

  todosValue = this.todoResource.value;
  todoLoading = this.todoResource.isLoading;
  todoStatus = this.todoResource.status;
  // $request
  addTodo = (todo: Omit<Todo, 'id'>) => {
    this.httpClient
      .post<Todo>(`${this.url}/todos`, todo)
      .pipe(map((dtos) => dtos))
      .subscribe({
        next: (todo) => this.todosValue
          .update((t) => [...t, todo]),
      });
  };

  deleteTodo(id: number) {
    this.httpClient.delete(`${this.url}/todos/${id}`)
      .subscribe({
      next: () => this.todosValue.update((t) => t
        .filter((v) => v.id !== id)),
    });
  }

  updateTodo(id: number, completed: boolean) {
    this.httpClient.patch(`${this.url}/todos/${id}`,
      { completed }).subscribe({
      next: () =>
        this.todosValue.update((todos) =>
          todos.map((t) => (t.id === id ? { ...t, completed } : t)),
        ),
    });
  }

  // limit
  changeLimit(limit: number) {
    this.limit.set(limit);
  }
}
