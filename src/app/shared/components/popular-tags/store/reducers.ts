import { createFeature, createReducer, on } from '@ngrx/store';

import { PopularTagsStateInterface } from '../types/popular-tags-state.interface';
import { popularTagsActions } from './actions';

const initState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initState,
    on(popularTagsActions.getPopularTags, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(popularTagsActions.getPopularTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })),
    on(popularTagsActions.getPopularTagsFailure, (state) => ({
      ...state,
    }))
  ),
});

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReduer,
  selectIsLoading,
  selectError,
  selectData: selectPopularTagsData,
} = popularTagsFeature;
