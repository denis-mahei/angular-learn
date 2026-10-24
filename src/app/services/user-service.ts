import { Service, signal } from '@angular/core';
import { User } from '../user';

@Service()
export class UserService {
  users = signal<User[]>([]);

  addUser(user: Omit<User, 'id'>) {
    this.users.update((current) => [...current, { ...user, id: crypto.randomUUID() }]);
  }

  deleteUser(id: string) {
    this.users.update((user) => user.filter((u) => u.id !== id));
  }
}
