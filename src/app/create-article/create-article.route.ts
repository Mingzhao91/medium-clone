import { Route } from '@angular/router';

import { CreateArticleComponent } from './components/create-article.component';
import { CreateArticleService } from './services/create-article.service';

export const route: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [CreateArticleService],
  },
];
