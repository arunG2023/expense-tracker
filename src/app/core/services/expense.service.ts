import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from '../config/api-url-config';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private _userExpenseData$: BehaviorSubject<any> = new BehaviorSubject(null);
  private _userExpenseData: Observable<any> = this._userExpenseData$.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  public getExpenseDataFromAPI():Observable<any>{
    return this._http.get(apiUrl.GET_EXPENSES);
  }

  public setExpenseData(data: any){
    this._userExpenseData$.next(data);
  }

  public getExpenseData(){
    return this._userExpenseData;
  }
} 
