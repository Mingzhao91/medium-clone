import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./global-feed/global-feed.routes').then((m) => m.routes),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./your-feed/your-feed.routes').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('./tag-feed/tag-feed.routes').then((m) => m.routes),
  },

  {
    path: 'articles/new',
    loadChildren: () =>
      import('./create-article/create-article.route').then((m) => m.route),
  },
  {
    path: 'articles/:slug',
    loadChildren: () => import('./article/article.route').then((m) => m.route),
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () =>
      import('./edit-article/edit-article.route').then((m) => m.route),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.route').then((m) => m.routes),
  },
  {
    path: 'profiles/:slug',
    loadChildren: () =>
      import('./user-profile/user-profile.route').then((m) => m.routes),
  },
  {
    path: 'profiles/:slug/favorites',
    loadChildren: () =>
      import('./user-profile/user-profile.route').then((m) => m.routes),
  },
];
