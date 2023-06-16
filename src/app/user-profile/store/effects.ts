import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { userProfileActions } from './actions';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileInterface } from '../types/user-profile.interface';

export const getUserProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService)
  ) =>
    actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }) =>
        userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfileInterface) =>
            userProfileActions.getUserProfileSuccess({ userProfile })
          ),
          catchError(() => of(userProfileActions.getUserProfileFailure()))
        )
      )
    ),
  { functional: true }
);
