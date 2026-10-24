import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserCard } from '../user-card/user-card';
import { UserService } from '../services/user-service';

@Component({
  imports: [FormsModule, ReactiveFormsModule, UserCard],
  selector: 'app-user-list',
  templateUrl: './user-list.html',
})
export class UserList {
  userService = inject(UserService);

  loginForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  onSubmit() {
    this.userService.addUser(this.loginForm.getRawValue());
  }

  usersLength = computed(() => this.userService.users().length);
}
