import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RegisterComponent } from './components/register/register.component';
import { authReducer } from './store/reducers';

const routes: Route[] = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
  ],
})
export class AuthModule {}
