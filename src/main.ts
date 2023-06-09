import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import {
  feedFeatureKey,
  feedReducer,
} from './app/shared/components/feed/store/reducers';
import {
  popularTagsFeatureKey,
  popularTagsReduer,
} from './app/shared/components/popular-tags/store/reducers';
import * as authEffects from './app/auth/store/effects';
import * as feedEffects from './app/shared/components/feed/store/effects';
import * as popularTagsEffects from './app/shared/components/popular-tags/store/effects';
import * as addToFavoritesEffects from './app/shared/components/add-to-favorites/store/effects';
import * as followUserEffects from './app/shared/components/follow-user/store/effects';
import { authInterceptor } from './app/shared/services/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReduer),
    provideEffects(
      authEffects,
      feedEffects,
      popularTagsEffects,
      addToFavoritesEffects,
      followUserEffects
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
});
