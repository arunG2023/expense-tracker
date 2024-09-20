import { Injectable } from '@angular/core';
import { Login, RegisterUser } from '../interfaces/interface';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
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

  // Get user profile data
  public getUserProfileData(): Observable<any>{
    return this._http.get(apiUrl.GET_USER_PROFILE);
  }

  // Open and Close 
  public profilePage: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public profilePage$: Observable<boolean> = this.profilePage.asObservable(); 

  public showProfilePage(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    document.body.classList.add('body');
    this.profilePage.next(true);
  }

  public closeProfilePage(){
    document.body.classList.remove('body');
    this.profilePage.next(false);
  }


}
