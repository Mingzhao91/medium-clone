import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { followUserActions } from './store/actions';

@Component({
  selector: 'mc-follow-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-user.component.html',
})
export class FollowUserComponent {
  @Input() isFollowed: boolean = false;
  @Input() userNameSlug: string = '';

  constructor(private store: Store) {}

  handleFollow(): void {
    this.store.dispatch(
      followUserActions.followUser({
        isFollowed: this.isFollowed,
        slug: this.userNameSlug,
      })
    );

    this.isFollowed = !this.isFollowed;
  }
}
