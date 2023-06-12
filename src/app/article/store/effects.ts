import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ArticleService as SharedArticleService } from '../../shared/services/article.service';
import { articleActions } from './actions';
import { ArticleInterface } from '../../shared/types/article.interface';

export const articleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(SharedArticleService)) =>
    actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }) =>
        articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) =>
            articleActions.getArticleSuccess({ article })
          ),
          catchError(() => of(articleActions.getArticleFailure()))
        )
      )
    ),
  { functional: true }
);
