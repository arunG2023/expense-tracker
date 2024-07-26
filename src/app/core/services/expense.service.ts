import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiUrl } from '../config/api-url-config';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  public getUserExpenses():Observable<any>{
    return this._http.get(apiUrl.GET_EXPENSES);
  }
} 
