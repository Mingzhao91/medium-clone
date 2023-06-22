import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { ArticleFormValuesInterface } from '../../shared/components/article-form/types/article-form-values.interface';
import { ArticleFormComponent } from '../../shared/components/article-form/article-form.component';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { ArticleRequestInterface } from '../../shared/types/article-request';
import { createArticleActions } from '../store/actions';

@Component({
  selector: 'mc-create-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './create-article.component.html',
})
export class CreateArticleComponent {
  store = inject(Store);

  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
}
