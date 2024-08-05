import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseTableData } from '../../interfaces/interface';
import { htmlLabel } from '../../config/common-config';
import { RoundPipe } from '../../pipes/round.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncateStringPipe } from '../../pipes/truncate-string.pipe';
import { DialogService } from '../../services/dialog.service';
import { ExpenseService } from '../../services/expense.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [
    CommonModule,
    RoundPipe,
    FormsModule,
    NgxPaginationModule,
    TruncateStringPipe
  ],
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {
  // HTML Label:
  public htmlLabel: any = htmlLabel;

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  @Input() inputData: ExpenseTableData = {
    title: htmlLabel.TEXT.APPLICATION_NAME,
    limit: 1,
    data: []
  }

  @Input() refreshData: Observable<any> = new Observable();

  public searchInput: string = '';

  public expenseTableData: any[] = [];

  constructor(
      private _dialogService: DialogService,
      private _expenseSerice: ExpenseService
  ) { }

  ngOnInit(): void {
    this.expenseTableData = this.inputData.data;

    this.refreshData.pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe(data => this.expenseTableData = data);
  }

  public filterTable(searchText: string) {
    if (searchText && searchText.length > 0) {
      this.expenseTableData = this.inputData.data.filter((expense): boolean | undefined => {
        if (this.inputData.data.length > 0) {
          for (const key in expense) {
            const value = expense[key].toString().toLowerCase();
            if (value.includes(searchText.toLowerCase())) return true;
          }
        }
        return false;
      })
    }
    else {
      this.expenseTableData = this.inputData.data
    }
  }


  public deleteExpense(id: string){
    this._dialogService.showDialog({isShow: true, data: {
      id: id}})
  }
  


  public page: number = 1;

  public pageChanged(thisPage: any) {
    this.page = thisPage
  }

}
