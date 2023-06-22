import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectCurrentUser } from '../../../auth/store/reducers';

@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './feed-toggler.component.html',
})
export class FeedTogglerComponent {
  store = inject(Store);

  @Input() tagName?: string;

  currentUser$ = this.store.select(selectCurrentUser);
}
