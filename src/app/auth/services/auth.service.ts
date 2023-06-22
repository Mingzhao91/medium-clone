import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { RegisterRequestInterface } from '../types/register-request.interface';
import { AuthResponseInterface } from '../types/auth-response.interface';
import { LoginRequestInterface } from '../types/login-request.interface';
import { CurrentUserRequestInterface } from 'src/app/shared/types/current-user-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/user`;
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/login`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  updateCurrentUser(
    currentUserRequest: CurrentUserRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/user`;
    return this.http
      .put<AuthResponseInterface>(url, currentUserRequest)
      .pipe(map(this.getUser));
  }
}
