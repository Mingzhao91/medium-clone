import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { addToFavoritesActions } from './actions';
import { AddToFavoritesService } from '../services/add-to-favorites.service';
import { ArticleInterface } from '../../../../shared/types/article.interface';

export const addToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? addToFavoritesService.removeFromFavorites(slug)
          : addToFavoritesService.addToFavorites(slug);

        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({ article });
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
