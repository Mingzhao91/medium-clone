import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { authActions } from '../../store/actions';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { RegisterRequestInterface } from '../../types/register-request.interface';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    BackendErrorMessagesComponent,
  ],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  store = inject(Store);

  form: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  data$ = combineLatest({
    isSubmitting: this.store.pipe(select(selectIsSubmitting)),
    backendErrors: this.store.pipe(select(selectValidationErrors)),
  });

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }
}
