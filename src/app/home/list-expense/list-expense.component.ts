import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { htmlLabel, validationLimit } from 'src/app/core/config/common-config';
import { ExpenseTableData } from 'src/app/core/interfaces/interface';
import { ExpenseService } from 'src/app/core/services/expense.service';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css']
})
export class ListExpenseComponent implements OnInit {

   // Will be from API:
   public expenseTableData: ExpenseTableData = {
    limit: validationLimit.LIST_ALL_EXPENSE_ROW_LIMIT,
    title: htmlLabel.TEXT.ALL_EXPENSES,
    data: []
  }

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  public refreshData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
          private _expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this._expenseService.getExpenseData()
    .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
    .subscribe(expenseData => {
      if(expenseData && expenseData.data.allExpenses.length > 0){
        this.expenseTableData.data = expenseData.data.allExpenses;
        this.refreshData.next(expenseData.data.allExpenses);
      }
    })
  }

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
