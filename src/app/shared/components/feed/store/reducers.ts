import { createFeature, createReducer, on } from '@ngrx/store';
import { feedActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { FeedStateInterface } from '../types/feed-state.interface';

const initState: FeedStateInterface = {
  isLoading: false,
  data: null,
  error: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initState,
    on(feedActions.getFeed, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(feedActions.getFeedSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })),
    on(feedActions.getFeedFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initState)
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectData: selectFeedData,
  selectError,
} = feedFeature;
