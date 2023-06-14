import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';

import { CreateArticleService } from '../services/create-article.service';
import { createArticleActions } from './actions';
import { ArticleInterface } from '../../shared/types/article.interface';

export const createArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    createArticleService = inject(CreateArticleService)
  ) =>
    actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }) =>
        createArticleService.createArticle(request).pipe(
          map((article: ArticleInterface) =>
            createArticleActions.createArticleSuccess({ article })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              createArticleActions.createArticleFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      tap(({ article }) => router.navigate(['/articles', article.slug]))
    ),
  { functional: true, dispatch: false }
);
