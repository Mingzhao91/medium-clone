import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';

export const followUserActions = createActionGroup({
  source: 'Follow user',
  events: {
    'Follow user': props<{ isFollowed: boolean; slug: string }>(),
    'Follow user success': props<{ profile: ProfileInterface }>(),
    'Follow user failure': emptyProps(),
  },
});
