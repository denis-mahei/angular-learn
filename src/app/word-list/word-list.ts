import { Component, inject } from '@angular/core';
import { WordService } from '../services/word-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Word } from '../word';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-word-list',
  templateUrl: './word-list.html',
})
export class WordList {
  wordService = inject(WordService);

  wordControl = new FormGroup({
    term: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit() {

  }
}
