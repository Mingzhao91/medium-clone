import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ArticleFormValuesInterface } from './types/article-form-values.interface';
import { BackendErrorsInterface } from '../../types/backend-errors.interface';
import { BackendErrorMessagesComponent } from '../backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'mc-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesComponent],
  templateUrl: './article-form.component.html',
})
export class ArticleFormComponent implements OnInit {
  fb = inject(FormBuilder);

  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorsInterface | null = null;
  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided!');
    }

    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    };
    this.articleSubmit.emit(articleFormValues);
  }
}
