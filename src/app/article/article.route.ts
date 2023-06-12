import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { ArticleComponent } from './components/article/article.component';
import * as articleEffects from './store/effects';
import { articleFeatureKey, articleReducer } from './store/reducers';

export const route: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
];
