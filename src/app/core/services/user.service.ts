import { Injectable } from '@angular/core';
import { Login, RegisterUser } from '../interfaces/interface';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { apiUrl } from '../config/api-url-config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ){}

  public loginUser(loginData: Login): Observable<any>{
    return this._http.post(apiUrl.LOGIN,loginData)
  }

  public storeAccessToken(token: string): void{
    localStorage.setItem('Token', token);
  }

  public isLoggedIn(): Boolean{
    return Boolean(localStorage.getItem('Token'));
  }

  public createUser(userData: RegisterUser): Observable<any> {
    return this._http.post(apiUrl.REGISTER, userData);
  }

  public logOutUser(): void {
    localStorage.removeItem('Token');
    this._router.navigate(['']);
  }

  public getAccessToken(): any{
    return localStorage.getItem('Token');
  }

  public decodeToken(): any{
    const jwtHelper = new JwtHelperService();
    const userData =  jwtHelper.decodeToken(this.getAccessToken());
    // console.log(userData);
    return userData;
  }
}
