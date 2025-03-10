import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from '../config/api-url-config';
import { AddExpense } from '../interfaces/interface';

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

  public getCategoryData(): Observable<any> {
    return this._http.get(apiUrl.GET_ALL_CATEGORIES);
  }

  // Api call to add category
  public addCategory(data: any): Observable<any>{
    return this._http.post(apiUrl.ADD_CATEGORY, data);
  }

  public getModeDate(): Observable<any> {
    return this._http.get(apiUrl.GET_ALL_MODE);
  }

  public addExpense(data: AddExpense): Observable<any> {
    return this._http.post(apiUrl.ADD_EXPENSE, data);
  }

  public deleteExpense(id: string): Observable<any> {
    return this._http.delete(apiUrl.DELETE_EXPENSE, {
      body: {
        id: id
      }
    });
  }

  public editExpense(data: any): Observable<any> {
    return this._http.put(apiUrl.UPDATE_EXPENSE, data);
  }

  public sortExpenseByDateDesc(expenses: any){
    expenses.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // console.log(data);
    return expenses;
  }

  public sortExpenseByDateAsc(expenses: any){
    expenses.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    // console.log(data);
    return expenses;
  }

  // Methods to calculate expense amounts
  public calculateTotal(expenseArr : any[]): string{
    let total = 0;
    if(expenseArr && expenseArr.length){
        expenseArr.forEach(exp => total += parseFloat(exp.amount));
    }
    return this.roundAmountToTwoDecimals(total);
  }

  public roundAmountToTwoDecimals(amount : any): string{
    return parseFloat(amount).toFixed(2);
  }
} 
