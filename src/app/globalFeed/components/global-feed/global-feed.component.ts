import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedComponent } from '../../../shared/components/feed/feed.component';
import { BannerComponent } from '../../../shared/components/banner/banner.component';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [CommonModule, FeedComponent, BannerComponent],
  templateUrl: './global-feed.component.html',
})
export class GlobalFeedComponent {
  apiUrl: string = '/articles';
}
