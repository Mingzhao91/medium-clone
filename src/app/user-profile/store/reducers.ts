import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';

import { userProfileActions } from './actions';
import { UserProfileStateInterface } from '../types/user-profile-state.interface';

const initState: UserProfileStateInterface = {
  isLoading: false,
  data: null,
  error: null,
};

export const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initState)
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectData: selectUserProfileData,
  selectError,
} = userProfileFeature;
