import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { selectCurrentUser } from '../../../auth/store/reducers';

@Component({
  selector: 'mc-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  data$ = combineLatest({ currentUser: this.store.select(selectCurrentUser) });

  constructor(private store: Store) {}
}
