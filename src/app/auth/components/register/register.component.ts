import { Component } from '@angular/core';
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

import { registerAction } from '../../store/actions/register.actions';
import {
  isSumbittingSelector,
  validationErrorsSelector,
} from '../../store/selector';
import { RegisterRequestInterface } from '../../types/register-request.interface';
import { BackendErrorMessagesComponent } from '../../../shared/modules/backend-error-messages/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    BackendErrorMessagesComponent,
  ],
})
export class RegisterComponent {
  form: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  data$ = combineLatest({
    isSubmitting: this.store.pipe(select(isSumbittingSelector)),
    backendErrors: this.store.pipe(select(validationErrorsSelector)),
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value.getRawValue(),
    };
    this.store.dispatch(registerAction({ request }));
  }
}
