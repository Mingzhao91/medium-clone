import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/app-state.interface';
import { AuthStateInterface } from '../types/auth-state.interface';

export const authFeatureSelector = (
  state: AppStateInterface
): AuthStateInterface => state.auth;

export const isSumbittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => {
    return authState.isSubmitting;
  }
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => {
    return authState.validationErrors;
  }
);
