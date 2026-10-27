import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Todo } from './todo';
import { map, Observable } from 'rxjs';

const url = 'https://jsonplaceholder.typicode.com';

@Service()
export class TodoService {
  private httpClient = inject(HttpClient);
  limit = signal<number>(10);
  todoResource = httpResource<Todo[]>(
    () => ({
      url: `${url}/todos`,
      params: {
        _limit: this.limit(),
      },
    }),
    { defaultValue: [] },
  );

  todosValue = this.todoResource.value;
  todoLoading = this.todoResource.isLoading;
  todoStatus = this.todoResource.status;

  addTodo = (todo: Omit<Todo, 'id'>) => {
    this.httpClient
      .post<Todo>(`${url}/todos`, todo)
      .pipe(map((dtos) => dtos))
      .subscribe({
        next: (todo) => this.todosValue.update((t) => [...t, todo]),
      });
  };

  changeLimit(limit: number) {
    this.limit.set(limit);
  }

  deleteTodo(id: number) {
    this.httpClient.delete(`${url}/todos/${id}`).subscribe({
      next: () => this.todosValue.update((t) => t.filter((v) => v.id !== id)),
    });
  }
}
