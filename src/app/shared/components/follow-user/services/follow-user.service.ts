import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { GetUserProfileResponseInterface } from '../../../../user-profile/types/get-user-profile-response.interface';
import { ProfileInterface } from '../../../../shared/types/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class FollowUserService {
  constructor(private http: HttpClient) {}

  getUrl(userName: string) {
    return `${environment.apiUrl}/profiles/${userName}/follow`;
  }

  getProfile(response: GetUserProfileResponseInterface): ProfileInterface {
    return response.profile;
  }

  followUser(userName: string): Observable<ProfileInterface> {
    const url = this.getUrl(userName);
    return this.http
      .post<GetUserProfileResponseInterface>(url, {})
      .pipe(map(this.getProfile));
  }

  unfollowUser(userName: string) {
    const url = this.getUrl(userName);
    return this.http
      .delete<GetUserProfileResponseInterface>(url)
      .pipe(map(this.getProfile));
  }
}
