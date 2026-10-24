import { Component, input, output } from '@angular/core';
import { User } from '../user';

@Component({
  imports: [],
  selector: 'app-user-card',
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>()
  deleted = output<string>()

  onDelete() {
    this.deleted.emit(this.user().id);
  }
}
