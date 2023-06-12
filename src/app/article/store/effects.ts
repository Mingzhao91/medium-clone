import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { ArticleService as SharedArticleService } from '../../shared/services/article.service';
import { articleActions } from './actions';
import { ArticleInterface } from '../../shared/types/article.interface';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

export const getArticleEffect = createEffect(
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

export const deleteArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) =>
    actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({ slug }) =>
        articleService.deleteArticle(slug).pipe(
          map(() => articleActions.deleteArticleSuccess()),
          catchError(() => of(articleActions.deleteArticleFailure()))
        )
      )
    ),
  { functional: true }
);

export const redirectAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    ),
  { functional: true, dispatch: false }
);
