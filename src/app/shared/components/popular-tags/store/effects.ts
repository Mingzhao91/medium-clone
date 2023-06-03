import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, of } from 'rxjs';

import { PopularTagType } from '../../../types/popular-tag.type';
import { PopularTagService } from '../services/popular-tag.service';
import { popularTagsActions } from './actions';

export const getPopularTagsEffects = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagService)
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() =>
        popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) =>
            popularTagsActions.getPopularTagsSuccess({ popularTags })
          ),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        )
      )
    );
  },
  { functional: true }
);
