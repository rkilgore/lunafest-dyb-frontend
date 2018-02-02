import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";

import { AuthService } from "../firebase-services/auth.service";
import { UnauthenticatedUser, AuthenticatedUser } from '../models';
import { DybBaseService } from './dyb-base.service';

@Injectable()
export class LoginService extends DybBaseService {

  private readonly LOGIN_API_BASE = "/api/login";

  constructor(private backendAuthService: AuthService) {
    super();
  }

  public attemptLogin(user: UnauthenticatedUser): Promise<firebase.UserInfo> {
    return this.backendAuthService.attemptLogin(user.email, user.password);
  }

  public logout(): Promise<void> {
    return this.backendAuthService.logout();
  }
}
