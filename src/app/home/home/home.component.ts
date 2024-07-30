import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public changeDarkTheme: boolean = false;
  public enableSideBar: boolean = false;

  public loadSpinner: boolean = false;

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();
  
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this._loadDataFromAPI();
  }

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  private _loadDataFromAPI(){
    this.loadSpinner = true;
    this._expenseService.getExpenseDataFromAPI()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe(res => {
        this.loadSpinner = false;
        this._expenseService.setExpenseData(res);
      })
  }

  public logOut(){
    this._userService.logOutUser();
  }

  public changeTheme(value: boolean){
    this.changeDarkTheme = value;
  }

  public showSideBar(value: boolean){
    this.enableSideBar = value
  }

  public closeSideBar(value: boolean){
    this.enableSideBar = !value;
  }

}
