import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ){}

  public loginUser(loginData: Login): Observable<any>{
    return this._http.post('http://localhost:4010/login',loginData)
  }

  public storeAccessToken(token: string): void{
    localStorage.setItem('Token', token);
  }

  public isLoggedIn(): Boolean{
    return Boolean(localStorage.getItem('Token'));
  }

  public logOutUser(): void {
    localStorage.removeItem('Token');
    this._router.navigate(['']);
  }
}
