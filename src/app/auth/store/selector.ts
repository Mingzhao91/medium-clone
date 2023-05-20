import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import { AuthStateInterface } from '../types/authState.interface';

export const authFeatureSelector = (
  state: AppStateInterface
): AuthStateInterface => state.auth;

export const isSumbittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => {
    return authState.isSubmitting;
  }
);
