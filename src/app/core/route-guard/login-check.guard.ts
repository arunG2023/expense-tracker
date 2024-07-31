import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { routesConfig } from '../config/routes-config';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckGuard implements CanActivate {
  constructor(
        private _userService: UserService,
        private _router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._userService.isLoggedIn()){
      this._router.navigate([routesConfig.HOME]);
      return false;
    }
    else{
      return true;
    }
  }
  
}
