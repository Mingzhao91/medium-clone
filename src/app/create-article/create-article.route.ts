import { Route } from '@angular/router';

import { CreateArticleComponent } from './components/create-article.component';

export const route: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
  },
];
