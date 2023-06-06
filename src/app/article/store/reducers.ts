import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';

import { ArticleStateInterface } from '../types/article-state.interface';
import { articleActions } from './actions';

const initState: ArticleStateInterface = {
  isLoading: false,
  data: null,
  error: null,
};

export const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initState,
    on(articleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(articleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.article,
    })),
    on(articleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initState)
  ),
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectIsLoading,
  selectData: selectArticleData,
  selectError,
} = articleFeature;
