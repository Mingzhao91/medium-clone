import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { authActions } from './auth/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent],
})
export class AppComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
