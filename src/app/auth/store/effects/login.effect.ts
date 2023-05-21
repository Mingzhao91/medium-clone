import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.actions';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { AuthService } from '../../services/auth.service';
import { PersistanceService } from '../../../shared/services/persistance.service';

@Injectable()
export class loginEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) {}

  login$ = this.actions$.pipe(
    ofType(loginAction),
    switchMap(({ request }) => {
      return this.authService.login(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistanceService.set('accessToken', currentUser.token);
          return loginSuccessAction({ currentUser });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(loginFailureAction(errorResponse.error.errors));
        })
      );
    })
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
