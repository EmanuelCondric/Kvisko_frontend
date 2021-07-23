import { Injectable } from '@angular/core';
import { globalParams } from 'src/app/modules/oc-core/app-defs/global-params';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(globalParams.authTokenKey);
    window.localStorage.setItem(globalParams.authTokenKey, token);
  }

  public getToken(): string {
    return localStorage.getItem(globalParams.authTokenKey)!;
  }

  public saveUser(user: any) {
    window.localStorage.removeItem(globalParams.authUserKey);
    window.localStorage.setItem(globalParams.authUserKey, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(localStorage.getItem(globalParams.authUserKey)!);
  }
}