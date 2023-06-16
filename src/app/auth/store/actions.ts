import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../types/register-request.interface';
import { LoginRequestInterface } from '../types/login-request.interface';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';
import { CurrentUserRequestInterface } from 'src/app/shared/types/current-user-request';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),

    'Get current user': emptyProps(),
    'Get current user success': props<{ currentUser: CurrentUserInterface }>(),
    'Get current user failure': emptyProps(),

    'Update current user': props<{
      currentUserRequest: CurrentUserRequestInterface;
    }>(),
    'Update current user success': props<{
      currentUser: CurrentUserInterface;
    }>(),
    'Update current user failure': props<{ errors: BackendErrorsInterface }>(),

    Logout: emptyProps(),
  },
});
