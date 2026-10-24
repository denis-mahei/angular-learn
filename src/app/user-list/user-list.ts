import { Component, computed, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../user';
import { UserCard } from '../user-card/user-card';

@Component({
  imports: [FormsModule, ReactiveFormsModule, UserCard],
  selector: 'app-user-list',
  templateUrl: './user-list.html',
})
export class UserList {
  users = signal<User[]>([]);

  loginForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  onSubmit() {
    this.addUser(this.loginForm.getRawValue());
  }

  usersLength = computed(() => this.users().length);

  addUser(user: Omit<User, 'id'>) {
    this.users.update((current) => [...current, { ...user, id: crypto.randomUUID() }]);
  }

  deleteUser(id: string) {
    this.users.update((user) => user.filter((u) => u.id !== id));
  }
}
