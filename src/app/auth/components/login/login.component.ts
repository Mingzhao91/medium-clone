import { Component, inject } from '@angular/core';
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
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import { LoginRequestInterface } from '../../types/login-request.interface';
import { authActions } from '../../store/actions';
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
  fb = inject(FormBuilder);
  store = inject(Store);

  form: FormGroup = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.pipe(select(selectIsSubmitting)),
    backendErrors: this.store.pipe(select(selectValidationErrors)),
  });

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store.dispatch(authActions.login({ request }));
  }
}
