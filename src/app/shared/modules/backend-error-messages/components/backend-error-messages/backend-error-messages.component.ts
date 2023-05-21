import { Component, Input, OnInit } from '@angular/core';

import { BackendErrorsInterface } from '../../../../types/backend-errors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() backendErrors: BackendErrorsInterface;

  errorMessages: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const message = this.backendErrors[name].join('');
      return `${name} ${message}`;
    });
  }
}
