import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import {
  isSumbittingSelector,
  validationErrorsSelector,
} from '../../store/selector';

import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import { LoginRequestInterface } from '../../types/login-request.interface';
import { loginAction } from '../../store/actions/login.actions';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
})
export class LoginComponent {
  form: FormGroup = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.pipe(select(isSumbittingSelector)),
    backendErrors: this.store.pipe(select(validationErrorsSelector)),
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store.dispatch(loginAction({ request }));
  }
}
