import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';

import { EditArticleService } from '../services/edit-article.service';
import { ArticleService as SharedArticleService } from '../../shared/services/article.service';
import { editArticleActions } from './actions';
import { ArticleInterface } from '../../shared/types/article.interface';

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(SharedArticleService)) =>
    actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({ slug }) =>
        articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) =>
            editArticleActions.getArticleSuccess({ article })
          ),
          catchError(() => of(editArticleActions.getArticleFailure()))
        )
      )
    ),
  { functional: true }
);

export const updateArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    editArticleService = inject(EditArticleService)
  ) =>
    actions$.pipe(
      ofType(editArticleActions.updateArticle),
      switchMap(({ request, slug }) =>
        editArticleService.updateArticle(slug, request).pipe(
          map((article: ArticleInterface) =>
            editArticleActions.updateArticleSuccess({ article })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              editArticleActions.updateArticleFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

export const redirectAfterEditEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(editArticleActions.updateArticleSuccess),
      tap(({ article }) => router.navigate(['/articles', article.slug]))
    ),
  { functional: true, dispatch: false }
);
