import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FollowUserService } from '../services/follow-user.service';
import { followUserActions } from './actions';
import { ProfileInterface } from '../../../../shared/types/profile.interface';

export const followUserEffects = createEffect(
  (
    actions$ = inject(Actions),
    followUserService = inject(FollowUserService)
  ) => {
    return actions$.pipe(
      ofType(followUserActions.followUser),
      switchMap(({ isFollowed, slug }) => {
        const profile$ = isFollowed
          ? followUserService.unfollowUser(slug)
          : followUserService.followUser(slug);

        return profile$.pipe(
          map((profile: ProfileInterface) => {
            return followUserActions.followUserSuccess({ profile });
          }),
          catchError(() => {
            return of(followUserActions.followUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
