import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedComponent } from '../../../shared/components/feed/feed.component';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [CommonModule, FeedComponent],
  templateUrl: './global-feed.component.html',
})
export class GlobalFeedComponent {}
