import { Route } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileService } from './services/user-profile.service';

export const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [UserProfileService],
  },
];
