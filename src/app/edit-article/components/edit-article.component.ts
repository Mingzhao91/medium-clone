import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';

import { ArticleFormValuesInterface } from '../../shared/components/article-form/types/article-form-values.interface';
import { ArticleFormComponent } from '../../shared/components/article-form/article-form.component';
import {
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} from '../store/reducers';
import { ArticleRequestInterface } from '../../shared/types/article-request';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { editArticleActions } from '../store/actions';
import { ArticleInterface } from '../../shared/types/article.interface';

@Component({
  selector: 'mc-edit-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
  templateUrl: './edit-article.component.html',
})
export class EditArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article != null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
    })
  );

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(
      editArticleActions.updateArticle({ request, slug: this.slug })
    );
  }
}
