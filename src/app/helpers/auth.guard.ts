import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../modules/oc-core/services/global.service';
import { globalParams } from '../modules/oc-core/app-defs/global-params';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private globalService: GlobalService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!state.url.startsWith("/login")) {
      this.globalService.anyAuthPageUrlCurrentOpen = false;
      if (!this.globalService.userLogged) { // client check, if token is saved under local storage. same in below methods.
        window.location.href = globalParams.appContextPath + globalParams.authLoginPath;
        return false;
      }
      // this.setAppParams(); // server check, if not auth 401 error and error interceptor will redirect to login page. same in below methods.
    }
    else {
      this.globalService.anyAuthPageUrlCurrentOpen = true;
    }
    
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.globalService.anyAuthPageUrlCurrentOpen = false;
    if (!this.globalService.userLogged) {
      window.location.href = globalParams.appContextPath + globalParams.authLoginPath;
      return false;      
    }
    // this.setAppParams();

    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    this.globalService.anyAuthPageUrlCurrentOpen = false;
    if (!this.globalService.userLogged) {
      window.location.href = globalParams.appContextPath + globalParams.authLoginPath;
      return false;
    }
    // this.setAppParams();
   
    return true;
  }


  setAppParams() {
    if (!this.globalService.appParams) {
      this.globalService.fetchAppParams();
    }
  }

}