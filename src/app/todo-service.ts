import { httpResource } from '@angular/common/http';
import { Service, signal } from '@angular/core';
import { Todo } from './todo';

@Service()
export class TodoService {
  limit = signal<number>(10);
  todoResource = httpResource<Todo[]>(
    () => ({
      url: 'https://jsonplaceholder.typicode.com/todos',
      params: {
        _limit: this.limit(),
      },
    }),
    { defaultValue: [] },
  );

  todosValue = this.todoResource.value;
  todoLoading = this.todoResource.isLoading;
  todoStatus = this.todoResource.status;

  changeLimit(limit: number) {
    this.limit.set(limit);
  }
}
