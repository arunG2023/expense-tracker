import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { routesConfig } from '../config/routes-config';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._userService.isLoggedIn()){
        return true;
      }
      else{
        this._router.navigate([routesConfig.ERROR_PAGE], {
          queryParams: { code: 403 }
        });
        return false;
      }
  }
  
}
